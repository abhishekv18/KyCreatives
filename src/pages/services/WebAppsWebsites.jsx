import { serviceBySlug } from "../../data/services";
import { useServiceMeta } from "../../hooks/usePageMeta";
import {
  ServiceHero,
  ServiceEnquiry,
  Offerings,
  Deliverables,
  RelatedWork,
  ServiceFaq,
  OtherServices,
} from "../../components/service/ServiceBlocks";
import SplitHeading from "../../components/ui/SplitHeading";
import ContactCTA from "../../components/ui/ContactCTA";
import PartnersStrip from "../../components/ui/PartnersStrip";
import { Blueprint, Glow } from "../../components/art/Art";
import { ConceptLabel } from "../../components/visuals/Visuals";
import WebBuildScene from "../../components/visuals/WebBuildScene";

const service = serviceBySlug["web-apps-websites"];

function HeroVisual() {
  return (
    <div className="web-hero">
      <WebBuildScene />
      <ConceptLabel tone="dark">Concept website and web app</ConceptLabel>
    </div>
  );
}

// Plain-language help for the most common first question.
const COMPARE = [
  {
    title: "You probably need a website",
    tone: "cloud",
    points: [
      "You want to explain your business and bring in enquiries",
      "Most visitors read, compare and contact you",
      "Your team updates pages, posts and products",
    ],
  },
  {
    title: "You probably need a web app",
    tone: "ink",
    points: [
      "People log in to do a task, not just read",
      "Data is created, changed and shared by users",
      "It replaces a manual process or a spreadsheet",
    ],
  },
];

function Compare() {
  return (
    <section className="cmp section" data-tone="light" aria-labelledby="cmp-title">
      <div className="container">
        <div className="cmp__head">
          <p className="kicker kicker--dusk t-meta">Website or web app?</p>
          <div id="cmp-title">
            <SplitHeading className="offer__title" lines={["Not sure which", "one you need?"]} />
          </div>
          <p className="t-lead" data-reveal="up">
            Many projects are a bit of both. This is the rule of thumb we use in a first conversation.
          </p>
        </div>
        <div className="cmp__grid">
          {COMPARE.map((c, i) => (
            <div className={`cmp__col cmp__col--${c.tone} ${c.tone === "ink" ? "on-dark" : ""}`} key={c.title} data-reveal="up" data-delay={i * 0.1}>
              <span className="cmp__letter" aria-hidden="true">
                {i === 0 ? "A" : "B"}
              </span>
              <h3 className="cmp__title">{c.title}</h3>
              <ul role="list">
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WebAppsWebsites() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--dusk">
      <ServiceHero
        service={service}
        theme="ink"
        art={
          <>
            <Blueprint />
            <Glow />
          </>
        }
        aside={<HeroVisual />}
      />
      <ServiceEnquiry service={service} />
      <Offerings
        service={service}
        title={["Websites and web apps,", "designed and engineered together."]}
        lead="The same people design the screens and write the code, so what you approve is what gets built."
      />
      <Compare />
      <RelatedWork
        slugs={["maacubs", "shabdmailnews", "shivangikaur", "abhinaybuilders", "property-box", "pinkdinosaur", "couponvolume", "bigbrothervisa", "brandgap"]}
        title={["Built for very", "different businesses."]}
        lead="Healthcare, marketing, news, coaching, property, real estate, staffing, deals and visas, for clients in India and abroad."
      />
      <Deliverables items={service.deliverables} tone="cyan" />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <PartnersStrip />
      <ContactCTA lines={["Tell us what your", "site needs to do."]} />
    </div>
  );
}
