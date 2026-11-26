import { Link } from "react-router-dom";
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
    tone: "ink",
    points: [
      "Customers look you up before they call or visit",
      "You need to be found on Google, Maps and AI search",
      "You want more enquiries and quote requests",
      "Most visitors arrive on their phone",
      "The same questions about prices, hours and services keep coming",
    ],
  },
  {
    title: "You probably need a web app",
    tone: "cloud",
    points: [
      "Your team runs on spreadsheets and copy-paste",
      "Customers should book, pay or order without calling",
      "Clients log in to check status, orders or documents",
      "Your tools don't talk to each other",
      "You want to grow without adding admin staff",
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
            Many projects are a bit of both. Websites are built here; web applications are part of our{" "}
            <Link to="/services/custom-software-development" className="link-u">
              custom software
            </Link>{" "}
            service.
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
        title={["Websites that explain,", "load fast and convert."]}
        lead="The same people design the screens and write the code, so what you approve is what gets built."
      />
      <Compare />
      <RelatedWork
        slugs={["thelabelbysiya", "shabdmailnews", "shivangikaur", "abhinaybuilders", "property-box", "pinkdinosaur", "couponvolume", "bigbrothervisa", "brandgap"]}
        title={["Built for very", "different businesses."]}
        lead="Fashion, news, coaching, property, real estate, staffing, deals, visas and marketing, for clients worldwide."
      />
      <Deliverables items={service.deliverables} tone="cyan" />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <PartnersStrip />
      <ContactCTA lines={["Tell us what your", "site needs to do."]} />
    </div>
  );
}
