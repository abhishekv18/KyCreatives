// POST /api/contact: every enquiry form on the site sends here.
//
// - Validates every field on the server (never trusts the browser).
// - Spam protection: a hidden trap field, a minimum fill time, a per-visitor
//   rate limit, and a cap on links in the message.
// - Emails the enquiry to the studio inbox (reply-to set to the visitor) and
//   sends the visitor a confirmation, through Resend's HTTP API.
//
// Environment (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY  required. API key from resend.com, with kycreatives.com verified
//   CONTACT_TO      optional. Studio inbox, default contact@kycreatives.com
//   CONTACT_FROM    optional. Sender, default "KY Creatives <hello@kycreatives.com>"

const TO = process.env.CONTACT_TO || "contact@kycreatives.com";
const FROM = process.env.CONTACT_FROM || "KY Creatives <hello@kycreatives.com>";
const KINDS = new Set(["enquiry", "consultation", "partner", "question"]);
const MIN_FILL_MS = 2500;
const RATE = { windowMs: 10 * 60 * 1000, max: 5 };

// best effort per-instance rate limit (serverless instances are short-lived)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE.max;
}

const clean = (v, max) => (typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max) : "");
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d\s().-]{7,25}$/;

function validate(body) {
  const errors = {};
  const kind = KINDS.has(body.kind) ? body.kind : "enquiry";
  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 30);
  const message = clean(body.message, 5000);
  const subject = clean(body.subject, 200) || "Website enquiry";

  if (name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Check the phone number.";
  if (kind !== "consultation" && message.length < 2) errors.message = "Add a short message.";

  // extra fields: plain short strings only
  const fields = {};
  if (body.fields && typeof body.fields === "object") {
    for (const [k, v] of Object.entries(body.fields).slice(0, 20)) {
      const key = clean(String(k), 40).replace(/[^\w -]/g, "");
      const val = clean(String(v ?? ""), 1000);
      if (key && val) fields[key] = val;
    }
  }
  return { errors, data: { kind, name, email, phone, message, subject, fields } };
}

async function sendMail(payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Mail provider error ${r.status}: ${await r.text().catch(() => "")}`);
}

function studioEmail(d) {
  const rows = [
    ["Name", d.name],
    ["Email", d.email],
    d.phone && ["Phone", d.phone],
    ...Object.entries(d.fields),
  ].filter(Boolean);
  const table = rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b6478;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`)
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#17121f">
<h2 style="font-size:18px;margin:0 0 12px">${esc(d.subject)}</h2>
<table style="border-collapse:collapse;margin-bottom:16px">${table}</table>
${d.message ? `<p style="white-space:pre-wrap;line-height:1.6;margin:0">${esc(d.message)}</p>` : ""}
</div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (d.message ? `\n\n${d.message}` : "");
  return { from: FROM, to: [TO], reply_to: d.email, subject: d.subject, html, text };
}

function visitorEmail(d) {
  const first = d.name.split(/\s+/)[0];
  const what = d.kind === "partner" ? "partner application" : d.kind === "question" ? "question" : "enquiry";
  const text = `Hi ${first},

Thank you for contacting KY Creatives. We have received your ${what} and will reply within 24 hours.

If anything is urgent, call or WhatsApp us on +91 76697 50672, or reply to this email.

KY Creatives
contact@kycreatives.com`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#17121f">
<p>Hi ${esc(first)},</p>
<p>Thank you for contacting KY Creatives. We have received your ${what} and will reply within 24 hours.</p>
<p>If anything is urgent, call or WhatsApp us on +91 76697 50672, or reply to this email.</p>
<p style="margin-top:24px">KY Creatives<br><a href="mailto:contact@kycreatives.com">contact@kycreatives.com</a></p>
</div>`;
  return { from: FROM, to: [d.email], reply_to: TO, subject: `We have received your ${what} | KY Creatives`, html, text };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  if (!body || typeof body !== "object") return res.status(400).json({ ok: false, error: "Invalid request" });

  // spam checks: answer bots with a quiet success so they learn nothing
  const tooFast = typeof body.startedAt === "number" && Date.now() - body.startedAt < MIN_FILL_MS;
  const links = (String(body.message || "").match(/https?:\/\//gi) || []).length;
  if (body.website || tooFast || links > 3) return res.status(200).json({ ok: true });

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (limited(ip)) return res.status(429).json({ ok: false, error: "Too many messages. Please try again in a few minutes." });

  const { errors, data } = validate(body);
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  if (!process.env.RESEND_API_KEY) {
    console.error("contact: RESEND_API_KEY is not set");
    return res.status(500).json({ ok: false, error: "The form is not configured yet." });
  }

  try {
    await sendMail(studioEmail(data));
  } catch (e) {
    console.error("contact: notify failed", e);
    return res.status(502).json({ ok: false, error: "We could not send your message." });
  }
  // the visitor's confirmation is a courtesy: the enquiry is already delivered
  try {
    await sendMail(visitorEmail(data));
  } catch (e) {
    console.error("contact: confirmation failed", e);
  }
  return res.status(200).json({ ok: true });
}
