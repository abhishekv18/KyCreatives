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
import { Arcs } from "../../components/art/Art";
import { PhoneMock, ConceptLabel } from "../../components/visuals/Visuals";

const service = serviceBySlug["mobile-apps"];

function HeroPhones() {
  return (
    <div className="app-hero">
      <Arcs className="app-hero__arcs" />
      <div className="app-hero__a" data-reveal="up" data-delay="0.1">
        <PhoneMock variant="home" />
      </div>
      <div className="app-hero__b" data-reveal="up" data-delay="0.3">
        <PhoneMock variant="order" />
      </div>
      <p className="app-hero__cap">
        <ConceptLabel tone="dark">Concept screens</ConceptLabel>
      </p>
    </div>
  );
}

const APPROACHES = [
  {
    title: "Native",
    sub: "Separate apps for Android and iOS",
    tone: "cyan",
    fit: [
      "The app leans on device features such as camera, sensors or background tasks",
      "Performance and platform feel matter more than build cost",
      "You plan to invest in each platform for the long term",
    ],
  },
  {
    title: "Cross-platform",
    sub: "One codebase for both stores",
    tone: "cloud",
    fit: [
      "You want both stores at launch on one budget and timeline",
      "Most screens are forms, lists, content and payments",
      "One team will maintain the app after launch",
    ],
  },
];

function Approach() {
  return (
    <section className="appr section" data-tone="light" aria-labelledby="appr-title">
      <div className="container">
        <div className="cmp__head">
          <p className="kicker kicker--aqua t-meta">Choosing an approach</p>
          <div id="appr-title">
            <SplitHeading className="offer__title" lines={["Native or cross-platform?", "It depends, and we say why."]} />
          </div>
          <p className="t-lead" data-reveal="up">
            Neither is right for every app. We recommend one after discovery and write down the reasons, including what
            you give up.
          </p>
        </div>
        <div className="appr__grid">
          {APPROACHES.map((a, i) => (
            <article className={`appr__col appr__col--${a.tone}`} key={a.title} data-reveal="up" data-delay={i * 0.1}>
              <h3 className="appr__title">{a.title}</h3>
              <p className="appr__sub">{a.sub}</p>
              <p className="appr__label t-meta">A good fit when</p>
              <ul role="list">
                {a.fit.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
          <span className="appr__vs t-meta" aria-hidden="true">
            or
          </span>
        </div>
      </div>
    </section>
  );
}

export default function MobileApps() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--violet">
      <ServiceHero service={service} theme="violet" aside={<HeroPhones />} />
      <Offerings
        service={service}
        title={["Apps for both stores,", "built to keep improving."]}
        lead="We design every state of every screen: loading, empty, error and offline, not only the happy path."
      />
      <Approach />
      <Deliverables items={service.deliverables} tone="ink" title={["From first sketch", "to the app stores"]} />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <ContactCTA lines={["Tell us who your", "app is for."]} />
    </div>
  );
}
