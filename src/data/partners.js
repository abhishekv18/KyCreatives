// Logos from the "Our Amazing Partners" carousel on kycreatives.com (home page).
// Names come from the logo itself or the image's alt text on that page.
// One logo carries no name on the site, so it is listed without one.

const logo = (slug) => `/images/partners/${slug}.webp`;

export const partners = [
  { name: "Manav Kalyan Sewa Charitable Trust", image: logo("manav-kalyan-sewa") },
  { name: "Oliveware", image: logo("oliveware") },
  { name: "Healer of the Ages", image: logo("healer-of-the-ages") },
  { name: "Kivisha Organic", image: logo("kivisha-organic") },
  { name: "The Luxury Needs", image: logo("the-luxury-needs"), shape: "tile" },
  { name: "Amader Nodi (government project)", short: "Amader Nodi", image: logo("amader-nodi") },
  { name: "Disha Fitness", image: logo("disha-fitness"), shape: "round" },
  { name: "Blacktop Ind", image: logo("blacktop-ind"), shape: "round" },
  { name: "Asrith", image: logo("asrith") },
  { name: null, image: logo("removals-partner") },
];
