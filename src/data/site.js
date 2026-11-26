// Company facts verified against kycreatives.com (contact page, footer) and the
// KY Creatives Brand Guidelines 2026. Update here and every page follows.

export const company = {
  name: "KY Creatives",
  tagline: "We design and build digital solutions for ambitious businesses.",
  descriptor: "E-commerce, mobile apps and custom software.",
  boilerplate:
    "KY Creatives designs and develops e-commerce platforms and websites, mobile applications and custom software for businesses worldwide. An international digital development partner, from high-performing online stores to mobile apps and business software.",
  foundedYear: 2019,
  email: "contact@kycreatives.com",
  phoneDisplay: "+91 76697 50672",
  phoneHref: "tel:+917669750672",
  // Direct wa.me link with the studio's default greeting (the same text the old
  // wa.link/v3qbnn short link carried). Linking straight to WhatsApp avoids the
  // redirect hop, which can drop the pre-filled message when the app opens.
  whatsapp:
    "https://wa.me/917669750672?text=" + encodeURIComponent("Hi KYCreatives, I have a requirement for a website!"),
  address: {
    label: "Mathura Office",
    lines: ["16-212, 58 D, Radha Nagar", "Krishna Nagar, Mathura", "Uttar Pradesh, India"],
    short: "Mathura, Uttar Pradesh",
    map:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("16-212, 58 D, Radha Nagar, Krishna Nagar, Mathura, Uttar Pradesh, India"),
  },
  // kycreatives.com/contact: "we endeavour to answer all enquiries within 24 hours"
  responseNote: "We answer every enquiry within 24 hours.",
};

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kycreatives" },
  { label: "Instagram", href: "https://www.instagram.com/kycreatives_/" },
  { label: "Facebook", href: "https://www.facebook.com/kycreatives6" },
  { label: "Pinterest", href: "https://in.pinterest.com/kycreatives/" },
];

export const reviewLinks = {
  trustpilot: "https://www.trustpilot.com/review/kycreatives.com",
  google: "https://g.page/r/CTZFjdBPX5QqEAI/review",
};

export const mainNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", short: "Privacy", to: "/privacy-policy" },
  { label: "Terms & Conditions", short: "Terms", to: "/terms-and-conditions" },
  { label: "Refunds & Cancellation", short: "Refunds", to: "/refunds-and-cancellation" },
];
