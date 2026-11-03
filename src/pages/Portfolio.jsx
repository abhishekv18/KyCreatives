import { useEffect, useState } from "react";
import { ScrollTrigger } from "../lib/motion";
import { ArrowUpRight } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import PartnersStrip from "../components/ui/PartnersStrip";
import QuickEnquiry from "../components/ui/QuickEnquiry";
import ContactCTA from "../components/ui/ContactCTA";
import { Glow, Pattern } from "../components/art/Art";
import { projects, projectBySlug, GROUPS, shotSrc } from "../data/projects";
import { company } from "../data/site";

const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

/*
  Every website in the portfolio, in the studio's own order (the KY Creatives
  Linktree, with BrandGap last), as tall cards with a browser bar and a link to
  the live site.
  A row of filters narrows the grid by kind of website; the enquiry form
  closes the page.
*/
/* Hero centrepiece: three live client sites fanned like proofs on a desk,
   with a few plain facts floating beside them. */
function HeroStack() {
  const picks = ["rugsandroses", "maacubs", "thedecorshed"].map((s) => projectBySlug[s]);
  return (
    <div className="pf-stack" aria-hidden="true">
      {picks.map((p, i) => (
        <figure key={p.slug} className={`pf-stack__card pf-stack__card--${i + 1}`}>
          <span className="pf-card__bar">
            <i />
            <i />
            <i />
            <span>{domainOf(p.liveUrl)}</span>
          </span>
          <img src={shotSrc(p.slug, "portfolio").src.replace(".webp", "-sm.webp")} alt="" width="640" height="800" />
        </figure>
      ))}
      <span className="pf-stack__badge pf-stack__badge--a">Live client websites</span>
      <span className="pf-stack__badge pf-stack__badge--b">
        <i /> India · UK · UAE
      </span>
      <span className="pf-stack__badge pf-stack__badge--c">Since {company.foundedYear}</span>
    </div>
  );
}

export default function Portfolio() {
  usePageMeta({
    title: "Portfolio",
    description:
      "Websites designed and built by KY Creatives: D2C stores, business websites, news platforms and non-profits for clients in India and abroad.",
  });
  const [filter, setFilter] = useState("all");
  // the grid changes height when filtered, so scroll positions are re-measured
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filter]);
  const shown = filter === "all" ? projects : projects.filter((p) => p.group === filter);
  const groups = GROUPS.filter((g) => projects.some((p) => p.group === g.id));
  const shownLabel = groups.find((g) => g.id === filter)?.label || "All websites";

  return (
    <>
      <PageHero
        theme="ink"
        kicker="Portfolio"
        kickerTone="aqua"
        lines={["Every website,", "in one place."]}
        lead="Online stores, company websites, news platforms and non-profits, designed and built by the same team. Each one is a live site you can visit."
        art={
          <>
            <Glow />
            <Pattern kind="dots" />
          </>
        }
        aside={<HeroStack />}
        className="phero--portfolio"
      >
        <ul role="list" className="afacts t-meta" data-reveal="up" data-delay="0.3">
          <li>
            <span>Since</span>
            {company.foundedYear}
          </li>
          <li>
            <span>Studio</span>
            {company.address.short}
          </li>
          <li>
            <span>Focus</span>
            D2C brands
          </li>
        </ul>
      </PageHero>

      <section className="pf" data-tone="light" aria-labelledby="pf-title">
        <div className="container">
          <div className="pf__head">
            <h2 id="pf-title" className="sr-only">
              All websites
            </h2>
            <ul role="list" className="pf__filters" aria-label="Filter websites">
              <li>
                <button type="button" className="pf__filter" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
                  All
                </button>
              </li>
              {groups.map((g) => (
                <li key={g.id}>
                  <button type="button" className="pf__filter" aria-pressed={filter === g.id} onClick={() => setFilter(g.id)}>
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
            <p className="sr-only" aria-live="polite">
              Showing: {shownLabel}
            </p>
          </div>

          <ol role="list" className="pf__grid">
            {shown.map((p, i) => {
              const tall = shotSrc(p.slug, "portfolio");
              return (
                <li key={p.slug} className="pf-card" data-reveal="rise" data-delay={(i % 3) * 0.08}>
                  <a className="pf-card__shot" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    <span className="pf-card__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span>{domainOf(p.liveUrl)}</span>
                    </span>
                    <img
                      src={tall.src}
                      srcSet={tall.srcSet}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                      alt={`${p.name} website`}
                      loading={i >= 3 ? "lazy" : "eager"}
                      width="720"
                      height="900"
                    />
                    <span className="pf-card__over">
                      <span>{p.summary}</span>
                    </span>
                    <span className="pf-card__visit">
                      Visit site <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <div className="pf-card__info">
                    <h3 className="pf-card__name">{p.name}</h3>
                    <span className="pf-card__meta t-meta">
                      {p.sector} · {p.kind}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <QuickEnquiry
        source="Portfolio"
        kicker="Start your project"
        lines={["Like what you see?", "Let's build yours."]}
        lead="Tell us about your business and what you want the website to do. We reply within 24 hours on business days."
        theme="portfolio"
      />
      <PartnersStrip />
      <ContactCTA lines={["Your website could", "be the next one."]} />
    </>
  );
}
