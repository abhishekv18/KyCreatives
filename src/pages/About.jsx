import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MessageSquareText, Users, MonitorCheck, Clock } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import SplitHeading from "../components/ui/SplitHeading";
import ContactCTA from "../components/ui/ContactCTA";
import { services } from "../data/services";
import { projectBySlug } from "../data/projects";
import { testimonials } from "../data/testimonials";
import { company } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { Ribbons } from "../components/art/Art";
import { projects } from "../data/projects";

// From the brand guidelines: "Brand essence, what we are, in five lines".
const ESSENCE = [
  ["What we are", "A design-led studio building software, web apps and mobile apps."],
  ["Who we serve", "Businesses worldwide, with a special focus on D2C brands that need a standout website."],
  ["Purpose", "To build software that lets businesses grow without limits."],
  ["Promise", "Every product we ship launches fast and scales cleanly."],
];

const WAYS = [
  {
    icon: Users,
    title: "One team, start to finish",
    body: "The people who design your product are the people who build it. Decisions are made together, not passed along.",
  },
  {
    icon: MessageSquareText,
    title: "Plain words",
    body: "We explain options and trade-offs in plain language, so you can make decisions without a glossary.",
  },
  {
    icon: MonitorCheck,
    title: "Working builds over slides",
    body: "We show progress as something you can click and test, and we let the finished product make the case.",
  },
  {
    icon: Clock,
    title: "Across time zones",
    body: "Written updates, shared boards and calls planned around your working hours, wherever you are.",
  },
];

const STRIP = ["thedecorshed", "pinkdinosaur", "vibhadesigns", "australglazing", "petsway", "property-box", "notahoax", "couponvolume"];

function WorkStrip() {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".astrip__track",
        { xPercent: 0 },
        {
          xPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    <section className="astrip" ref={ref} data-tone="light" aria-label="A selection of client websites">
      <div className="astrip__track">
        {STRIP.map((slug) => {
          const p = projectBySlug[slug];
          return (
            <figure key={slug} className="astrip__item">
              <img src={p.image} alt={`${p.name} website`} loading="lazy" width="520" height="650" />
              <figcaption className="t-meta">{p.name}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export default function About() {
  usePageMeta({
    title: "About the studio",
    description:
      "KY Creatives is a design-led studio in Gurugram, India, building software, web apps and mobile apps for businesses worldwide since 2017.",
  });
  const quote = testimonials[1];

  return (
    <>
      <PageHero
        theme="ink"
        kicker="About KY Creatives"
        kickerTone="aqua"
        lines={["Engineers with", "a designer's eye."]}
        lead={company.boilerplate}
        art={<Ribbons set="footer" />}
      >
        <ul role="list" className="afacts t-meta" data-reveal="up" data-delay="0.3">
          <li>
            <span>Founded</span>
            {company.foundedYear}
          </li>
          <li>
            <span>Studio</span>
            {company.address.short}
          </li>
          <li>
            <span>Portfolio</span>
            {projects.length} websites
          </li>
          <li>
            <span>Focus</span>
            D2C brands
          </li>
        </ul>
      </PageHero>

      <section className="astory section" data-tone="light" aria-labelledby="astory-title">
        <div className="container astory__grid">
          <h2 id="astory-title" className="kicker t-meta" data-reveal="fade">
            Our story
          </h2>
          <div className="astory__body">
            <p className="astory__big" data-reveal="up">
              We started in {company.foundedYear} as a web design and development team in Gurugram, India.
            </p>
            <div className="astory__cols prose" data-reveal="up" data-delay="0.1">
              <p>
                Since then we have worked with customers of every size, from a single retailer to multinational
                companies, on their websites, applications and marketing. Our portfolio spans online stores, company
                websites, portals, news platforms and non-profits, including work for businesses in the United Kingdom
                and the UAE.
              </p>
              <p>
                Today our work covers software, web apps and mobile apps as well as websites. Our focus is D2C brands
                that sell online and need a website that does real work for the business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WorkStrip />

      <section className="essence section" data-tone="light" aria-labelledby="essence-title">
        <div className="container">
          <div className="intro">
            <p className="kicker t-meta">What we stand for</p>
            <div id="essence-title">
              <SplitHeading className="about__h" lines={["What we create", "is business."]} />
            </div>
          </div>
          <dl className="essence__list">
            {ESSENCE.map(([term, def], i) => (
              <div className={`essence__row essence__row--${i}`} key={term} data-reveal="up">
                <dt className="t-meta">{term}</dt>
                <dd>{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ways section on-dark grain" data-tone="dark" aria-labelledby="ways-title">
        <div className="container">
          <div className="intro intro--split">
            <div className="intro">
              <p className="kicker kicker--aqua t-meta">How we work with you</p>
              <div id="ways-title">
                <SplitHeading className="about__h" lines={["Partners,", "not vendors."]} />
              </div>
            </div>
            <p className="t-lead" data-reveal="up">
              Good products come from close collaboration. These are the habits we bring to every project, whatever its
              size.
            </p>
          </div>
          <ul role="list" className="ways__list" data-stagger="">
            {WAYS.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                <h3 className="t-h3">{title}</h3>
                <p className="t-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="acap section" data-tone="light" aria-labelledby="acap-title">
        <div className="container acap__grid">
          <div className="intro acap__intro">
            <p className="kicker kicker--dusk t-meta">What we do</p>
            <div id="acap-title">
              <SplitHeading className="about__h" lines={["Design, engineering", "and growth, in one place."]} />
            </div>
            <p className="t-muted" data-reveal="up">
              Each service has its own page with what is included and how a project runs.
            </p>
          </div>
          <ul role="list" className="acap__list">
            {services.map((s) => (
              <li key={s.slug} data-reveal="up">
                <Link to={s.path} className="acap__item">
                  <span className="acap__name">{s.name}</span>
                  <span className="t-muted">{s.short}</span>
                  <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" className="acap__arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="aquote section" data-tone="light" aria-label="Client testimonial">
        <div className="container">
          <figure className="aquote__fig" data-reveal="up">
            <blockquote>
              <p>{quote.quote}</p>
            </blockquote>
            <figcaption>
              <span className="quotes__name">{quote.name}</span>
              <span className="t-muted">{quote.company}</span>
            </figcaption>
          </figure>
          <Link to="/#work" className="link-u" data-reveal="up">
            See selected work
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ContactCTA lines={["Let's talk about", "your next build."]} />
    </>
  );
}
