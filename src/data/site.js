// Company facts verified against kycreatives.com (contact page, footer) and the
// KY Creatives Brand Guidelines 2026. Update here and every page follows.

export const company = {
  name: "KY Creatives",
  tagline: "What we create is business.",
  descriptor: "Design led software, web and mobile apps.",
  boilerplate:
    "KY Creatives is a design led studio that builds software, web apps and mobile apps for businesses around the world. We have a special focus on D2C brands, designing and building websites that help them launch faster and grow with fewer limits.",
  // kycreatives.com home and About pages: "since 2017"
  foundedYear: 2017,
  email: "info@kycreatives.com",
  phoneDisplay: "+91 76697 50672",
  phoneHref: "tel:+917669750672",
  whatsapp: "https://wa.link/v3qbnn",
  address: {
    lines: ["Tower A - 114, Ninex RMG", "Sector 37C, Gurugram", "Haryana 122001, India"],
    short: "Gurugram, India",
    map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ninex RMG, Sector 37C, Gurugram, Haryana 122001, India"),
  },
  // kycreatives.com/contact: "we endeavour to answer all enquiries within 24 hours on business days"
  responseNote: "We aim to answer every enquiry within 24 hours on business days.",
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
