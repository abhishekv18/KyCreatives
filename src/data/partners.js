// The studio's clients, in the order of the KY Creatives Linktree. Each logo
// is taken from the client's own live website header, with that header's
// background, so it is shown as a small rounded tile.

const logo = (slug) => `/images/partners/${slug}.webp`;

export const partners = [
  { name: "MaaCubs Healthcare", image: logo("maacubs") },
  { name: "BrandGap", image: logo("brandgap") },
  { name: "The Decorshed", image: logo("thedecorshed") },
  // the live logo is white on a carpet texture, unreadable at card size
  { name: "Rugs & Roses", wordmark: { text: "Rugs & Roses", color: "#7a2b2b", serif: true } },
  { name: "The Label by Siya", image: logo("thelabelbysiya") },
  { name: "Vibha Designs", image: logo("vibhadesigns") },
  { name: "Dudle Fashion", image: logo("dudle") },
  { name: "Ramy's Professional", image: logo("ramysprofessional") },
  { name: "Pets Way", image: logo("petsway") },
  { name: "Shabdmail News", image: logo("shabdmailnews") },
  { name: "Coach Shivangi Kaur", image: logo("shivangikaur") },
  { name: "Abhinay Builders", image: logo("abhinaybuilders") },
  { name: "Property Box", image: logo("property-box") },
  // the live site's logo image does not load, so the name is set as a wordmark
  { name: "Pink Dinosaur", wordmark: { text: "Pink Dinosaur", color: "#e8457a" } },
  { name: "Healer of the Ages", image: logo("healeroftheages") },
  { name: "Coupon Volume", image: logo("couponvolume") },
  { name: "Not a Hoax", image: logo("notahoax") },
  { name: "Sarv Dharam Sewa Sangh", image: logo("sarvdharamsewasangh") },
  { name: "Big Brother Visa", image: logo("bigbrothervisa") },
  { name: "Maa Pitambara Pragya Peeth", image: logo("maapitambara") },
].map((p) => ({ ...p, shape: "tile" }));
