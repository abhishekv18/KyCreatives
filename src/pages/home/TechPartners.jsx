import SplitHeading from "../../components/ui/SplitHeading";

/*
  The platforms the studio builds on, as a slow, continuous slider of
  full-colour logos on white cards that keeps moving; with reduced motion it
  becomes a still, wrapping set.
*/
const PARTNERS = [
  { name: "Shopify", role: "Storefronts", file: "shopify" },
  { name: "Cloudflare", role: "CDN and security", file: "cloudflare" },
  { name: "Razorpay", role: "Payments", file: "razorpay" },
  { name: "Amazon Web Services", role: "Cloud infrastructure", file: "aws" },
  { name: "GoKwik", role: "Checkout", file: "gokwik" },
  { name: "Hostinger", role: "Web hosting", file: "hostinger" },
  { name: "PayU", role: "Payments", file: "payu" },
  { name: "Judge.me", role: "Product reviews", file: "judgeme" },
  { name: "ReelUp", role: "Shoppable video", file: "reelup" },
];

function Card({ p, hidden }) {
  return (
    <li className="tps__card" aria-hidden={hidden || undefined}>
      <span className="tps__logo">
        <img src={`/images/tech/${p.file}-color.webp`} alt={hidden ? "" : `${p.name} logo`} loading="lazy" decoding="async" />
      </span>
      <span className="tps__role t-meta">{p.role}</span>
    </li>
  );
}

export default function TechPartners() {
  return (
    <section className="tps" data-tone="light" aria-labelledby="tps-title">
      <div className="container tps__head">
        <p className="kicker kicker--dusk t-meta">Our technology partners</p>
        <div>
          <div id="tps-title">
            <SplitHeading as="h2" className="tps__title" lines={["Built on platforms", "the world trusts."]} />
          </div>
        </div>
        <div className="tps__side" data-reveal="up">
          <p className="t-muted">
            Hosting, checkout, payments and growth tools we build with every day, chosen for speed, security and scale.
          </p>
        </div>
      </div>

      <div className="tps__rail">
        <ul role="list" className="tps__track" aria-label="Technology partner logos">
          {PARTNERS.map((p) => (
            <Card key={p.name} p={p} />
          ))}
          {PARTNERS.map((p) => (
            <Card key={`${p.name}-dup`} p={p} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
