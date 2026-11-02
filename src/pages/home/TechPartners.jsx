import { useState } from "react";
import { Pause, Play } from "lucide-react";
import SplitHeading from "../../components/ui/SplitHeading";

/*
  The platforms the studio builds on, as a slow, continuous slider of
  full-colour logos on white cards, with a second, thinner row of the jobs
  they do running the other way. Hover, focus or the Pause button stops
  both rows; with reduced motion they become a still, wrapping set.
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

const JOBS = ["Hosting", "CDN", "Cloud", "Storefronts", "Checkout", "Payments", "UPI and cards", "Reviews", "Shoppable video", "Security"];

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
  const [paused, setPaused] = useState(false);
  return (
    <section className="tps" data-tone="light" aria-labelledby="tps-title">
      <div className="container tps__head">
        <div>
          <p className="kicker kicker--dusk t-meta">Our technology partners</p>
          <div id="tps-title">
            <SplitHeading as="h2" className="tps__title" lines={["Built on platforms", "the world trusts."]} />
          </div>
        </div>
        <div className="tps__side" data-reveal="up">
          <p className="t-muted">
            Hosting, checkout, payments and growth tools we build with every day, chosen for speed, security and scale.
          </p>
          <div className="tps__meta">
            <span className="tps__count">
              <b>{PARTNERS.length}</b> partner platforms
            </span>
            <button type="button" className="partners__toggle" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
              {paused ? <Play size={14} strokeWidth={2} aria-hidden="true" /> : <Pause size={14} strokeWidth={2} aria-hidden="true" />}
              {paused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
      </div>

      <div className={`tps__rail ${paused ? "is-paused" : ""}`}>
        <ul role="list" className="tps__track" aria-label="Technology partner logos">
          {PARTNERS.map((p) => (
            <Card key={p.name} p={p} />
          ))}
          {PARTNERS.map((p) => (
            <Card key={`${p.name}-dup`} p={p} hidden />
          ))}
        </ul>
      </div>

      <div className={`tps__rail tps__rail--jobs ${paused ? "is-paused" : ""}`} aria-hidden="true">
        <ul role="list" className="tps__track tps__track--rev">
          {[...JOBS, ...JOBS].map((j, i) => (
            <li key={i} className="tps__job">
              <i />
              {j}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
