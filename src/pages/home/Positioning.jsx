import { Gauge, ShoppingBag, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SplitHeading from "../../components/ui/SplitHeading";

// The three positioning pillars come straight from the brand guidelines.
// Each sits on its own colour field: Cobalt for engineering, Flame for D2C,
// Cyan for global delivery. Ink text on each is a readable brand pairing.
const PILLARS = [
  {
    icon: Gauge,
    tone: "cobalt",
    title: "Built to perform",
    body: "Fast, stable software, web apps and mobile apps, engineered to scale as your business grows.",
  },
  {
    icon: ShoppingBag,
    tone: "flame",
    title: "D2C websites",
    body: "Our focus area. Brand-led storefronts built for conversion, retention and repeat purchase.",
  },
  {
    icon: Globe,
    tone: "cyan",
    title: "Global by default",
    body: "Delivery, communication and standards built for clients across time zones.",
  },
];

export default function Positioning() {
  return (
    <section className="pos" data-tone="light" aria-labelledby="pos-title">
      <div className="container">
        <p className="kicker t-meta">The studio</p>
        <div id="pos-title" className="pos__statement">
          <SplitHeading
            as="h2"
            lines={["Designers and engineers", "in one team, building", "for businesses everywhere."]}
          />
        </div>

        <div className="pos__grid">
          <div className="pos__body">
            <p className="t-lead" data-reveal="up">
              We build software, web apps and mobile apps for businesses around the world, and high-performing websites
              for D2C brands.
            </p>
            <p className="t-muted" data-reveal="up" data-delay="0.08">
              Design decides how a product feels. Engineering decides whether it holds up. We do both in the same room,
              so nothing is lost in a handover and every screen we design is one we know how to ship.
            </p>
            <Link to="/about" className="link-u" data-reveal="up" data-delay="0.12">
              More about the studio
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>

          <ul role="list" className="pos__pillars" data-stagger="">
            {PILLARS.map(({ icon: Icon, tone, title, body }, i) => (
              <li key={title} className={`pos__pillar pos__pillar--${tone}`}>
                <span className="pos__pillar-top">
                  <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  <span className="t-meta">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="pos__pillar-title">{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
