import { serviceBySlug } from "../../data/services";
import { useServiceMeta } from "../../hooks/usePageMeta";
import {
  ServiceHero,
  Offerings,
  Deliverables,
  RelatedWork,
  ServiceFaq,
  OtherServices,
} from "../../components/service/ServiceBlocks";
import SplitHeading from "../../components/ui/SplitHeading";
import BrowserFrame from "../../components/ui/BrowserFrame";
import ContactCTA from "../../components/ui/ContactCTA";
import { Blueprint, Ribbons } from "../../components/art/Art";
import { DashboardMock, ConceptLabel } from "../../components/visuals/Visuals";
import { shotSrc, projectBySlug } from "../../data/projects";

const service = serviceBySlug["web-apps-websites"];

function HeroVisual() {
  const s = shotSrc("pinkdinosaur", "wide");
  return (
    <div className="web-hero">
      <div className="web-hero__back" data-reveal="wipe">
        <img
          src={projectBySlug["property-box"].image}
          alt="Property Box real estate website"
          width="520"
          height="650"
          loading="eager"
        />
      </div>
      <div className="web-hero__site" data-reveal="up" data-delay="0.2">
        <BrowserFrame
          domain="pinkdinosaur.co"
          {...s}
          sizes="(min-width: 960px) 38vw, 90vw"
          alt="Pink Dinosaur company website home page"
          ratio="16 / 10"
          loading="eager"
          className="browser--dark"
        />
      </div>
      <div className="web-hero__app" data-reveal="up" data-delay="0.4">
        <DashboardMock />
        <ConceptLabel tone="dark">Concept web app screen</ConceptLabel>
      </div>
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
            <Ribbons set="footer" />
          </>
        }
        aside={<HeroVisual />}
      />
      <Offerings
        service={service}
        title={["Websites and web apps,", "designed and engineered together."]}
        lead="The same people design the screens and write the code, so what you approve is what gets built."
      />
      <Compare />
      <RelatedWork
        slugs={["pinkdinosaur", "property-box", "australglazing", "couponvolume", "asrithms", "rudrapolyplast", "newindia", "banglarjalapath", "sarvdharamsewasangh"]}
        title={["Built for very", "different businesses."]}
        lead="Staffing, real estate, manufacturing, news, public infrastructure and non-profits, in India, the UK and the UAE."
      />
      <Deliverables items={service.deliverables} tone="cyan" />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <ContactCTA lines={["Tell us what the website", "or app needs to do."]} />
    </div>
  );
}
