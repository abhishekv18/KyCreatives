/* Every form on the site sends through Web3Forms, which delivers each
   submission to the inbox the access key was created for
   (contact@kycreatives.com). The key is public by design: it can only send
   to that one inbox. VITE_WEB3FORMS_KEY in .env / Vercel overrides it. */
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "b1ab0b23-a343-4715-a9a4-e4b47d376ba5";
export const ENQUIRY_EMAIL = "contact@kycreatives.com";

const LABEL = {
  enquiry: "Project enquiry",
  consultation: "Consultation request",
  partner: "Partner application",
  question: "Partner program question",
};

export async function sendEnquiry({ kind = "enquiry", subject, botcheck = false, name, email, phone = "", message = "", ...fields }) {
  // only fields that were filled in, with readable names in the email
  const extra = Object.fromEntries(
    Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
      .map(([k, v]) => [k.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()), String(v).trim()])
  );
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: subject || `${LABEL[kind] || "Website enquiry"} | KY Creatives`,
      from_name: "KY Creatives website",
      replyto: email,
      botcheck: botcheck ? "on" : "",
      Form: LABEL[kind] || kind,
      Name: name,
      Email: email,
      ...(phone ? { Phone: phone } : {}),
      ...extra,
      Message: message || "No message given",
      Page: typeof window !== "undefined" ? window.location.href : "",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
  return data;
}
