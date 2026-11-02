/* Sends an enquiry to the studio inbox through Web3Forms. The access key is
   public by design (it only sends to the inbox it was issued for) and lives
   in .env.local / Vercel as VITE_WEB3FORMS_KEY. */
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
export const ENQUIRY_EMAIL = "kycreatives66@gmail.com";

export async function sendEnquiry({ subject, botcheck = false, ...fields }) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject,
      from_name: "KY Creatives website",
      replyto: fields.email,
      botcheck,
      ...fields,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
  return data;
}
