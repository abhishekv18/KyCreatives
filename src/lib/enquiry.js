/* Sends an enquiry to the studio's own endpoint (/api/contact), which
   validates it on the server, filters spam, emails the studio and sends the
   visitor a confirmation. */
export const ENQUIRY_EMAIL = "contact@kycreatives.com";

// when the page was opened: the server rejects forms filled in impossibly fast
const OPENED_AT = Date.now();

export async function sendEnquiry({ kind = "enquiry", subject, botcheck = false, name, email, phone = "", message = "", ...fields }) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      kind,
      subject,
      name,
      email,
      phone,
      message,
      fields,
      website: botcheck ? "1" : "",
      startedAt: OPENED_AT,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const err = new Error(data.error || "Send failed");
    err.fields = data.errors;
    throw err;
  }
  return data;
}
