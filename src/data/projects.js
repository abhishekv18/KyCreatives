// The studio's websites, in the order of the KY Creatives Linktree
// (linktr.ee/kycreatives). Descriptions only state what each site is, as
// visible on the live site itself. No results or metrics are claimed.
// Screenshots in /images/work were captured from the live sites (October 2026).
//
// group    : used by the portfolio filters (store, business, community).
// credited : the live site's footer links back to KY Creatives.

const img = (slug) => `/images/work/${slug}-portfolio.webp`;

export const GROUPS = [
  { id: "store", label: "Online stores" },
  { id: "business", label: "Business websites" },
  { id: "community", label: "Media and non-profits" },
];

const p = (slug, name, sector, kind, group, summary, liveUrl, extra = {}) => ({
  slug,
  name,
  sector,
  kind,
  group,
  summary,
  services: [kind],
  liveUrl,
  image: img(slug),
  ...extra,
});

export const projects = [
  p("maacubs", "MaaCubs Healthcare", "Mother and baby healthcare", "Health platform", "business",
    "A doctor-led healthcare platform for mothers and babies, with pregnancy and baby tracking, doctor consultations and a health library.",
    "https://www.maacubs.com/"),
  p("brandgap", "BrandGap", "Performance marketing", "Agency website", "business",
    "A website for a growth agency that helps D2C, e-commerce and service businesses with performance marketing and creative strategy.",
    "https://brand-gap.vercel.app/"),
  p("thedecorshed", "The Decorshed", "Home and garden decor", "D2C store", "store",
    "An online store for garden fountains, planters, miniatures and festive decor, organised by room and occasion.",
    "https://thedecorshed.com/", { credited: true }),
  p("rugsandroses", "Rugs & Roses", "Handcrafted rugs", "D2C store", "store",
    "An online store for handcrafted rugs and carpets, shopped by category, with customised rugs to order.",
    "https://rugsandroses.com/"),
  p("thelabelbysiya", "The Label by Siya", "Women's fashion", "D2C store", "store",
    "A fashion label's store for co-ord sets, suits, dresses and festive wear, organised by collection.",
    "https://thelabelbysiya.com/"),
  p("vibhadesigns", "Vibha Designs", "Gifts and stationery", "D2C store", "store",
    "A store for card decks, journals and gift sets inspired by Indian texts, with bundled collections and new arrivals.",
    "https://vibhadesigns.com/"),
  p("dudle", "Dudle Fashion", "Streetwear", "D2C store", "store",
    "A streetwear store for oversized tees, hoodies and crop tops, shopped by category for women and men.",
    "https://dudle.in/"),
  p("ramysprofessional", "Ramy's Professional", "Ayurvedic hair and skin care", "D2C store", "store",
    "A store for ayurvedic hair care, skin care and health products, with bestsellers and full ranges up front.",
    "https://ramysprofessional.com/"),
  p("petsway", "Pets Way", "Pet apparel and accessories", "D2C store", "store",
    "A playful store for dog and cat clothing, beds and accessories, shopped by category or by season.",
    "https://petsway.in/", { credited: true }),
  p("shabdmailnews", "Shabdmail News", "Hindi news", "News portal", "community",
    "A Hindi news portal with state, politics, technology and lifestyle sections and a spotlight on featured stories.",
    "https://shabdmailnews.com/"),
  p("shivangikaur", "Coach Shivangi Kaur", "Tarot and wellness coaching", "Workshop website", "business",
    "A website for a coach's live tarot and energy-healing workshop, built around the programme and registration.",
    "http://shivangikaur.com/"),
  p("abhinaybuilders", "Abhinay Builders", "Property sales and marketing", "Business website", "business",
    "A website for a pan-India property marketing and sales partner, setting out how it markets and sells projects for developers.",
    "https://greenyellow-goldfish-811242.hostingersite.com/"),
  p("property-box", "Property Box", "Real estate", "Business website", "business",
    "A real estate website for residential listings and property enquiries.",
    "https://property-box.com/"),
  p("pinkdinosaur", "Pink Dinosaur", "Staffing and IT services", "Business website", "business",
    "A website for a staffing, recruitment and IT services firm, with service pages and enquiry routes.",
    "https://pinkdinosaur.co/", { credited: true }),
  p("healeroftheages", "Healer of the Ages", "Crystals and wellness", "D2C store", "store",
    "A store for crystal bracelets, pendants and healing products, grouped by intention.",
    "https://healeroftheages717.com/"),
  p("couponvolume", "Coupon Volume", "Deals and coupons, UAE", "Web platform", "business",
    "A coupon and deals platform listing codes from retailers in the UAE.",
    "https://couponvolume.com/"),
  p("notahoax", "Not a Hoax", "Fragrance", "D2C store", "store",
    "A fragrance store for perfumes and home scents, with collections for men, women and the home.",
    "https://notahoax.in/"),
  p("sarvdharamsewasangh", "Sarv Dharam Sewa Sangh", "Non-profit", "Non-profit website", "community",
    "A website for a non-profit working with women and communities.",
    "https://sarvdharamsewasangh.org/"),
  p("bigbrothervisa", "Big Brother Visa", "IELTS, PTE and visa guidance", "Business website", "business",
    "A website for an IELTS and PTE coaching and study-visa consultancy, with courses, study-abroad destinations and enquiry routes.",
    "https://bigbrothervisa.com/"),
  p("maapitambara", "Maa Pitambara Pragya Peeth", "Spiritual organisation", "Organisation website", "community",
    "A website for a spiritual organisation's events, programmes and announcements.",
    "https://maapitambarapragyapeeth.org/"),
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export const shotSrc = (slug, variant = "site") => ({
  src: `/images/work/${slug}-${variant}.webp`,
  srcSet: `/images/work/${slug}-${variant}-sm.webp ${variant === "wide" ? 720 : 640}w, /images/work/${slug}-${variant}.webp ${variant === "wide" ? 1440 : 1200}w`,
});
