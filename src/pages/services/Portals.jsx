import { ShoppingCart, Truck, IdCard, ShieldCheck, Database, Lock } from "lucide-react";
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
import { Blueprint } from "../../components/art/Art";
import { PortalMock, ConceptLabel } from "../../components/visuals/Visuals";

const service = serviceBySlug.portals;

// Each role, what it does, and the screens it can reach. Illustrative of a
// typical portal; the real map is drawn with each client in discovery.
const ROLES = [
  {
    icon: ShoppingCart,
    role: "Customers",
    does: "Place and track orders, download invoices, raise requests.",
    sees: ["Orders", "Invoices", "Support"],
    side: "left",
  },
  {
    icon: Truck,
    role: "Vendors",
    does: "Receive purchase orders, update stock and prices, upload documents.",
    sees: ["Purchase orders", "Price lists", "Documents"],
    side: "left",
  },
  {
    icon: IdCard,
    role: "Employees",
    does: "Apply for leave, find policies, complete training, see updates.",
    sees: ["Leave", "Policies", "Training"],
    side: "right",
  },
  {
    icon: ShieldCheck,
    role: "Admins",
    does: "Manage users and permissions, approve work, export reports.",
    sees: ["Everything, with an audit trail"],
    side: "right",
  },
];

// Portal types listed in the KY Creatives service menu on kycreatives.com.
const TYPES = ["Sales CRM", "B2B portals", "B2C portals", "Online exam systems", "Travel booking portals", "Custom PHP portals"];

function HeroVisual() {
  return (
    <div className="portal-hero">
      <div className="portal-hero__mock" data-reveal="up">
        <PortalMock />
      </div>
      <span className="portal-hero__chip portal-hero__chip--a" data-reveal="up" data-delay="0.3">
        <Lock size={14} strokeWidth={1.75} aria-hidden="true" /> Role: Supplier
      </span>
      <span className="portal-hero__chip portal-hero__chip--b" data-reveal="up" data-delay="0.45">
        <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" /> Approval needed: Purchasing
      </span>
      <ConceptLabel>Concept screen</ConceptLabel>
    </div>
  );
}

function Role({ r }) {
  const Icon = r.icon;
  return (
    <li className={`rmap__role rmap__role--${r.side}`} data-reveal="up">
      <span className="rmap__icon">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="rmap__name">{r.role}</h3>
      <p className="rmap__does">{r.does}</p>
      <p className="rmap__sees t-meta">
        <span>Sees:</span> {r.sees.join(" / ")}
      </p>
    </li>
  );
}

function RoleMap() {
  const left = ROLES.filter((r) => r.side === "left");
  const right = ROLES.filter((r) => r.side === "right");
  return (
    <section className="roles section on-dark" data-tone="dark" aria-labelledby="roles-title">
      <Blueprint className="roles__grid-art" />
      <div className="container">
        <div className="cmp__head">
          <p className="kicker kicker--aqua t-meta">How a portal works</p>
          <div id="roles-title">
            <SplitHeading className="offer__title" lines={["Different people,", "one source of truth."]} />
          </div>
          <p className="roles__lead" data-reveal="up">
            Each role sees its own screens and actions. Underneath, everyone works on the same records, so nothing has
            to be copied between emails and spreadsheets.
          </p>
        </div>

        <div className="rmap">
          <svg className="rmap__lines" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true" data-draw-scrub="">
            <defs>
              <linearGradient id="rmap-g" x1="0" x2="1">
                <stop offset="0" stopColor="#6FE3F5" />
                <stop offset="1" stopColor="#4C8DEB" />
              </linearGradient>
            </defs>
            {[
              "M 360 130 C 470 130, 470 280, 560 280",
              "M 360 430 C 470 430, 470 280, 560 280",
              "M 840 130 C 730 130, 730 280, 640 280",
              "M 840 430 C 730 430, 730 280, 640 280",
            ].map((d) => (
              <path key={d} d={d} fill="none" stroke="url(#rmap-g)" strokeWidth="2" pathLength="1" data-draw="" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <ul role="list" className="rmap__col">
            {left.map((r) => (
              <Role key={r.role} r={r} />
            ))}
          </ul>
          <div className="rmap__core" data-reveal="up">
            <Database size={30} strokeWidth={1.5} aria-hidden="true" />
            <p className="rmap__core-title">Your business data</p>
            <p>Orders, documents, people and history, with a record of every change.</p>
          </div>
          <ul role="list" className="rmap__col">
            {right.map((r) => (
              <Role key={r.role} r={r} />
            ))}
          </ul>
        </div>
        <p className="roles__note t-meta">An illustrative role map. Yours is drawn with you during discovery.</p>
      </div>
    </section>
  );
}

export default function Portals() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--cobalt">
      <ServiceHero service={service} theme="cobalt" art={<Blueprint tone="light" />} aside={<HeroVisual />} />
      <RoleMap />
      <Offerings
        service={service}
        title={["Portals for every side", "of your business."]}
        lead="Start with the process that costs your team the most time each week. Most portals grow from one well-solved job."
      />
      <section className="ptypes" data-tone="light" aria-labelledby="ptypes-title">
        <div className="container ptypes__inner">
          <h2 id="ptypes-title" className="ptypes__title" data-reveal="up">
            Portal types we offer
          </h2>
          <ul role="list" className="ptypes__list" data-stagger="">
            {TYPES.map((t, i) => (
              <li key={t}>
                <span className="t-meta">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Deliverables items={service.deliverables} tone="violet" title={["From process map", "to trained team"]} />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <ContactCTA lines={["Which process should", "leave the spreadsheet first?"]} />
    </div>
  );
}
