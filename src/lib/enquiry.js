/* Every form on the site sends through Web3Forms, which delivers each
   submission to the inbox the access key was created for
   (contact@kycreatives.com). The key is public by design: it can only send
   to that one inbox.

   Each submission is also added as a row to a Google Sheet, through a small
   Apps Script web app in that sheet (scripts/google-sheets/Code.gs):
   - Contact sheet:  project enquiries and consultation requests
   - Partners sheet: partner applications and partner program questions
   The sheet is a copy for the team; if it is unavailable the email still
   goes out and the visitor sees a normal success. */
export const WEB3FORMS_KEY = "b1ab0b23-a343-4715-a9a4-e4b47d376ba5";
export const ENQUIRY_EMAIL = "contact@kycreatives.com";

// Each sheet's Apps Script web app URL (ends in /exec). Paste them here.
const SHEETS = {
  contact: "", // Contact form spreadsheet
  partners: "", // Partners form spreadsheet
};
// Must match TOKEN in scripts/google-sheets/Code.gs
const SHEETS_TOKEN = "kyc-forms-2026";

const LABEL = {
  enquiry: "Project enquiry",
  consultation: "Consultation request",
  partner: "Partner application",
  question: "Partner program question",
};
const SHEET_FOR = { enquiry: "contact", consultation: "contact", partner: "partners", question: "partners" };

function toSheet(kind, row) {
  const url = SHEETS[SHEET_FOR[kind]];
  if (!url) return Promise.resolve();
  // text/plain keeps this a simple request (Apps Script does not answer CORS preflights)
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ token: SHEETS_TOKEN, ...row }),
    keepalive: true,
  }).catch(() => {});
}

export async function sendEnquiry({ kind = "enquiry", subject, botcheck = false, name, email, phone = "", message = "", ...fields }) {
  // only fields that were filled in, with readable names
  const extra = Object.fromEntries(
    Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
      .map(([k, v]) => [k.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()), String(v).trim()])
  );
  const row = {
    Form: LABEL[kind] || kind,
    Name: name,
    Email: email,
    Phone: phone || "",
    ...extra,
    Message: message || "",
    Page: typeof window !== "undefined" ? window.location.href : "",
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: subject || `${row.Form} | KY Creatives`,
      from_name: "KY Creatives website",
      replyto: email,
      botcheck: botcheck ? "on" : "",
      ...Object.fromEntries(Object.entries(row).filter(([, v]) => v !== "")),
      Message: message || "No message given",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Send failed");

  // bots caught by the trap never reach the sheet
  if (!botcheck) await toSheet(kind, row);
  return data;
}
