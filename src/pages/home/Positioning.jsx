import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SplitHeading from "../../components/ui/SplitHeading";
import { company } from "../../data/site";

// The three positioning pillars come straight from the brand guidelines. Each
// is set as a ruled row and backed by one plain fact, so the principle reads
// as evidence, not a slogan.
const PILLARS = [
  {
    title: "Built to perform",
    note: "Fast, stable, made to scale",
    body: "Fast, stable software, web apps and mobile apps, engineered to scale as your business grows.",
    figure: "One team",
    proof: "designs and builds every screen, from first sketch to launch",
  },
  {
    title: "D2C websites",
    note: "Stores built to sell",
    body: "Our focus area. Brand-led storefronts built for conversion, retention and repeat purchase.",
    figure: "Our focus",
    proof: "storefronts and brand sites for businesses that sell online",
  },
  {
    title: "Global by default",
    note: "Standards for every time zone",
    body: "Delivery, communication and standards built for clients across time zones.",
    figure: "3",
    proof: "countries we have shipped for: India, the UK and the UAE",
  },
];

export default function Positioning() {
  return (
    <section className="pos" data-tone="light" aria-labelledby="pos-title">
      <div className="container">
        <div className="pos__head">
          <div>
            <p className="kicker t-meta">How we think</p>
            <div id="pos-title" className="pos__statement">
              <SplitHeading as="h2" lines={["Three things", "we build on."]} />
            </div>
            <ol role="list" className="pos__index">
              {PILLARS.map(({ title, note }, i) => (
                <li key={title}>
                  <span className="t-meta">{String(i + 1).padStart(2, "0")}</span>
                  {title}
                  <span className="pos__index-note">{note}</span>
                </li>
              ))}
            </ol>
            <p className="pos__facts t-meta">
              <span>Since {company.foundedYear}</span>
              <span>D2C focus</span>
              <span>India · UK · UAE</span>
            </p>
          </div>
          <div className="pos__body">
            <p className="t-lead" data-reveal="up">
              The same three principles shape every project, from a single landing page to a full platform.
            </p>
            <p className="t-muted" data-reveal="up" data-delay="0.08">
              Design decides how a product feels. Engineering decides whether it holds up. We do both in the same room,
              so nothing is lost in a handover and every screen we design is one we know how to ship.
            </p>
            <ul role="list" className="pos__means" data-reveal="up" data-delay="0.1">
              <li>One team from first sketch to launch</li>
              <li>No handover between design and build</li>
              <li>Every screen designed to ship</li>
            </ul>
            <Link to="/about" className="link-u" data-reveal="up" data-delay="0.12">
              More about the studio
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol role="list" className="pos__rows">
          {PILLARS.map(({ title, body, figure, proof }, i) => (
            <li key={title} className="pos__row" data-reveal="up">
              <span className="pos__n t-meta" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pos__main">
                <h3 className="pos__row-title">{title}</h3>
                <p>{body}</p>
              </div>
              <p className="pos__proof">
                <strong>{figure}</strong>
                <span>{proof}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
