import { serviceBySlug } from "../../data/services";
import { useServiceMeta } from "../../hooks/usePageMeta";
import {
  ServiceHero,
  Offerings,
  Deliverables,
  ServiceFaq,
  OtherServices,
} from "../../components/service/ServiceBlocks";
import SplitHeading from "../../components/ui/SplitHeading";
import ContactCTA from "../../components/ui/ContactCTA";
import { CampaignSet, ConceptLabel } from "../../components/visuals/Visuals";

const service = serviceBySlug.marketing;

// Channels from the KY Creatives digital marketing menu, with what each is measured by.
const CHANNELS = [
  ["Search engine optimisation", "Technical fixes, content and local search", "Search visibility, organic visits, enquiries", "violet"],
  ["Google Ads and PPC", "Search and shopping campaigns, keyword and budget management", "Cost per enquiry or sale", "cobalt"],
  ["Meta advertising", "Facebook and Instagram campaigns and creative", "Reach, cost per result, conversions", "magenta"],
  ["Social media", "Content calendar, designed posts, community replies", "Engagement and traffic to the site", "orange"],
  ["YouTube promotion", "Video campaigns and channel basics", "Views and click-throughs", "magenta"],
  ["Email and SMS", "Campaigns and automated messages to existing customers", "Opens, clicks and repeat orders", "cyan"],
  ["Content writing", "Articles, product and landing page copy", "Rankings and time on page", "violet"],
];

const PROMISES = [
  ["We will", ["Agree goals with you before spending budget", "Show you where every rupee or dollar went", "Change course when a channel is not working"]],
  ["We will not", ["Guarantee rankings or a number of leads", "Hide results behind vanity metrics", "Lock your ad accounts in our name"]],
];

/* One campaign as it would run: a story, a feed post and a search listing,
   set in our own identity (headlines from the brand guidelines). */
function HeroVisual() {
  return (
    <figure className="mkt-hero">
      <div data-reveal="up">
        <CampaignSet />
      </div>
      <figcaption>
        <ConceptLabel>Concept campaign, in our own identity</ConceptLabel>
      </figcaption>
    </figure>
  );
}

function Channels() {
  return (
    <section className="chan section" data-tone="light" aria-labelledby="chan-title">
      <div className="container">
        <div className="cmp__head">
          <p className="kicker t-meta">Channels / {String(CHANNELS.length).padStart(2, "0")}</p>
          <div id="chan-title">
            <SplitHeading className="offer__title" lines={["Each channel has a job,", "and a way to measure it."]} />
          </div>
        </div>
        <div className="chan__table" role="table" aria-label="Marketing channels">
          <div className="chan__row chan__head t-meta" role="row">
            <span role="columnheader">Channel</span>
            <span role="columnheader">What we do</span>
            <span role="columnheader">What we track</span>
          </div>
          {CHANNELS.map(([c, d, t, tone]) => (
            <div className="chan__row" role="row" key={c} data-reveal="up">
              <span role="cell" className="chan__name">
                <i className={`chan__dot bg-${tone}`} aria-hidden="true" />
                {c}
              </span>
              <span role="cell">{d}</span>
              <span role="cell" className="chan__track t-meta">
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="prom section on-dark" data-tone="dark" aria-labelledby="prom-title">
      <div className="container prom__grid">
        <div className="prom__intro">
          <p className="kicker kicker--aqua t-meta">Straight talk</p>
          <div id="prom-title">
            <SplitHeading className="offer__title" lines={["What we promise,", "and what we never will."]} />
          </div>
        </div>
        <div className="prom__cols">
          {PROMISES.map(([title, items], i) => (
            <div key={title} className={`prom__col prom__col--${i ? "no" : "yes"}`} data-reveal="up" data-delay={i * 0.1}>
              <h3 className="prom__title">{title}</h3>
              <ul role="list">
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Marketing() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--orange">
      <ServiceHero service={service} theme="orange" aside={<HeroVisual />} />
      <Channels />
      <Promises />
      <Offerings
        service={service}
        title={["Marketing that connects", "to the website it sends people to."]}
        lead="Because we also build websites, we fix the landing pages and tracking that campaigns depend on."
      />
      <Deliverables items={service.deliverables} tone="violet" title={["What each month", "includes"]} />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <ContactCTA lines={["Tell us where your", "customers come from today."]} />
    </div>
  );
}
