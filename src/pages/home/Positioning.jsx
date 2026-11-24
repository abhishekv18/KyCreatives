import { ArrowRight, Gauge, ShoppingBag, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import SplitHeading from "../../components/ui/SplitHeading";
import { company } from "../../data/site";

// Three principles from the brand guidelines, each written as what it means
// for the client, with one concrete commitment that backs it up.
const PROMISES = [
  {
    Icon: Gauge,
    title: "Built to perform",
    lead: "Your site loads fast and stays up.",
    body: "We engineer for speed, stability and growth from day one, so your website or app keeps pace as the business grows.",
    commit: "Tested on real devices before launch",
  },
  {
    Icon: ShoppingBag,
    title: "Made to sell",
    lead: "Your store is designed around the sale.",
    body: "Every page is planned for conversion, retention and repeat purchase, on Shopify or custom code.",
    commit: "Product, cart and checkout as one journey",
  },
  {
    Icon: LifeBuoy,
    title: "Here after launch",
    lead: "We stay on after your site goes live.",
    body: "Fixes, updates and improvements once you launch, so your website or app keeps working as the business grows.",
    commit: "Care and maintenance plans available",
  },
];

export default function Positioning() {
  const years = new Date().getFullYear() - company.foundedYear;
  return (
    <section className="pos2" data-tone="light" aria-labelledby="pos-title">
      <div className="container">
        <div className="pos2__head">
          <div>
            <p className="kicker t-meta">How we think</p>
            <div id="pos-title">
              <SplitHeading as="h2" className="pos2__title" lines={["Three promises", "behind every project."]} />
            </div>
          </div>
          <div className="pos2__intro">
            <p className="t-lead" data-reveal="up">
              Design decides how a product feels. Engineering decides whether it holds up. We do both in one team, so nothing is lost
              between the idea and the launch.
            </p>
          </div>
        </div>

        <ol role="list" className="pos2__grid" data-stagger="">
          {PROMISES.map(({ Icon, title, lead, body, commit }, i) => (
            <li key={title} className="pos2__card">
              <div className="pos2__top">
                <span className="pos2__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="pos2__n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="pos2__name">{title}</h3>
              <p className="pos2__lead">{lead}</p>
              <p className="pos2__body">{body}</p>
              <p className="pos2__commit">{commit}</p>
            </li>
          ))}
        </ol>

        <div className="pos2__band" data-reveal="up">
          <p className="pos2__band-text">
            One team from first sketch to launch, <span>since {company.foundedYear}.</span>
          </p>
          <ul role="list" className="pos2__stats">
            <li>
              <b>{years}+</b> years
            </li>
            <li>
              <b>1000+</b> projects
            </li>
            <li>
              <b>Worldwide</b> clients
            </li>
          </ul>
          <Link to="/about" className="pos2__link">
            More about the studio
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
