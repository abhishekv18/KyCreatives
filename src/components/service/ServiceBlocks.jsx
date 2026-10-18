import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import PageHero from "../ui/PageHero";
import Button from "../ui/Button";
import SplitHeading from "../ui/SplitHeading";
import Faq from "../ui/Faq";
import { services } from "../../data/services";
import { projectBySlug } from "../../data/projects";
import { serviceIcons } from "../ui/serviceIcons";

const DARK = new Set(["ink", "violet"]);

/** Service page opener: a themed colour field, page-specific art and centrepiece. */
export function ServiceHero({ service, aside, art, theme = "cloud", focus = false }) {
  const dark = DARK.has(theme);
  return (
    <PageHero
      theme={theme}
      kicker={focus ? `${service.name}, our focus area` : `Services / ${service.name}`}
      kickerTone={service.accent === "flame" ? undefined : service.accent}
      lines={service.hero.lines}
      lead={service.hero.lead}
      aside={aside}
      art={art}
      className={`shero shero--${service.slug}`}
    >
      <div className="phero__actions" data-reveal="up" data-delay="0.3">
        <Button to="/contact" variant={dark ? "flame" : "primary"}>
          Start a project
        </Button>
        <Button href="#offerings" variant="ghost">
          What we offer
        </Button>
      </div>
    </PageHero>
  );
}

/** Numbered index of offerings. Rows fill with the page accent on hover. */
export function Offerings({ service, title, lead }) {
  return (
    <section id="offerings" className="offer section" data-tone="light" aria-labelledby="offer-title">
      <div className="container">
        <div className="offer__head">
          <p className="kicker t-meta">What we offer / {String(service.offerings.length).padStart(2, "0")}</p>
          <div id="offer-title">
            <SplitHeading className="offer__title" lines={title} />
          </div>
          {lead && (
            <p className="t-lead" data-reveal="up">
              {lead}
            </p>
          )}
        </div>
        <ol role="list" className="offer__list">
          {service.offerings.map((o, i) => (
            <li key={o.title} className="offer__row" data-reveal="up">
              <span className="offer__num t-meta" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="offer__name">{o.title}</h3>
              <div className="offer__body">
                <p>{o.body}</p>
                {o.scoped && <span className="tag tag--scoped">Scope confirmed per project</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Deliverables on a chosen colour field. */
export function Deliverables({ items, title = ["What you receive"], tone = "ink", aside }) {
  const dark = DARK.has(tone);
  return (
    <section
      className={`deliv section deliv--${tone} ${dark ? "on-dark" : ""} grain`}
      data-tone={dark ? "dark" : "light"}
      aria-labelledby="deliv-title"
    >
      <div className="container deliv__grid">
        <div className="deliv__intro">
          <p className="kicker t-meta">Deliverables</p>
          <div id="deliv-title">
            <SplitHeading className="deliv__title" lines={title} />
          </div>
          <p className="deliv__count" aria-hidden="true">
            {String(items.length).padStart(2, "0")}
          </p>
          {aside}
        </div>
        <ul role="list" className="deliv__list" data-stagger="">
          {items.map((d) => (
            <li key={d}>
              <span className="deliv__check" aria-hidden="true">
                <Check size={16} strokeWidth={2} />
              </span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Real portfolio projects related to a service, staged on Ink. */
export function RelatedWork({ slugs, title = ["Work in this area"], lead }) {
  if (!slugs?.length) return null;
  return (
    <section className="rwork section on-dark" data-tone="dark" aria-labelledby="rwork-title">
      <div className="container">
        <div className="rwork__head">
          <p className="kicker kicker--aqua t-meta">Selected work</p>
          <div id="rwork-title">
            <SplitHeading className="rwork__title" lines={title} />
          </div>
          {lead && (
            <p className="rwork__lead" data-reveal="up">
              {lead}
            </p>
          )}
        </div>
        <ul role="list" className="rwork__list">
          {slugs.map((slug, i) => {
            const p = projectBySlug[slug];
            return (
              <li key={slug} className={`rwork__item rwork__item--${(i % 3) + 1}`}>
                <figure>
                  <div className="rwork__img" data-reveal="clip">
                    <img src={p.image} alt={`${p.name} website`} loading="lazy" width="520" height="650" />
                  </div>
                  <figcaption>
                    <span className="rwork__num t-meta">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rwork__name">{p.name}</span>
                    <span className="rwork__sector">{p.sector}</span>
                    {p.liveUrl && (
                      <a className="rwork__link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                        {domainOf(p.liveUrl)}
                        <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ServiceFaq({ faqs }) {
  return (
    <section className="sfaq section" data-tone="light" aria-labelledby="sfaq-title">
      <div className="container sfaq__grid">
        <div className="sfaq__intro">
          <p className="kicker t-meta">Questions</p>
          <h2 id="sfaq-title" className="sfaq__title" data-reveal="up">
            Asked before we start
          </h2>
          <p className="t-muted" data-reveal="up">
            Something else on your mind?{" "}
            <Link to="/contact" className="link-u">
              Ask us directly
            </Link>
          </p>
        </div>
        <div data-reveal="up">
          <Faq items={faqs} />
        </div>
      </div>
    </section>
  );
}

/** The other five services as a large typographic index. */
export function OtherServices({ current }) {
  const others = services.filter((s) => s.slug !== current);
  return (
    <nav className="others" data-tone="light" aria-label="Other services">
      <div className="container">
        <p className="kicker t-meta">Other services</p>
        <ul role="list" className="others__list">
          {others.map((s) => {
            const Icon = serviceIcons[s.slug];
            return (
              <li key={s.slug}>
                <Link to={s.path}>
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  <span className="others__name">{s.name}</span>
                  <span className="others__short">{s.short}</span>
                  <ArrowRight className="others__arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
