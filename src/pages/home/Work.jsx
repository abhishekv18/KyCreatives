import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import BrowserFrame from "../../components/ui/BrowserFrame";
import PhoneFrame from "../../components/ui/PhoneFrame";
import SplitHeading from "../../components/ui/SplitHeading";
import { projects, projectBySlug, shotSrc } from "../../data/projects";
import { gsap, prefersReducedMotion } from "../../lib/motion";

/*
  Featured projects, each staged on its own brand colour. Text colour per stage
  follows the guideline pairings: Ink on Orange, Cobalt and Magenta; White on
  Violet and Ink.
*/
const FEATURED = [
  { slug: "thedecorshed", stage: "orange", phone: "m-thedecorshed" },
  { slug: "vibhadesigns", stage: "violet", phone: "m-vibhadesigns" },
  { slug: "petsway", stage: "cobalt" },
  { slug: "notahoax", stage: "ink", phone: "m-notahoax" },
  { slug: "pinkdinosaur", stage: "magenta" },
];
const INITIAL_INDEX = 8;
const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function LiveLink({ project, className = "wpanel__link" }) {
  if (!project.liveUrl) return null;
  return (
    <a className={className} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
      <span>Visit {domainOf(project.liveUrl)}</span>
      <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Panel({ item, index, total }) {
  const p = projectBySlug[item.slug];
  const wide = shotSrc(p.slug, "wide");
  return (
    <article
      className={`wpanel wpanel--${item.stage}`}
      style={{ "--i": index }}
      aria-labelledby={`wp-${p.slug}`}
    >
      <div className="wpanel__shade" aria-hidden="true" />
      <div className="wpanel__info">
        <p className="wpanel__index t-meta">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          <span>{p.kind}</span>
        </p>
        <h3 id={`wp-${p.slug}`} className="wpanel__name">
          {p.name}
        </h3>
        <p className="wpanel__summary">{p.summary}</p>
        <p className="wpanel__meta t-meta">
          {p.sector}
          {p.services.map((s) => (
            <span key={s}> / {s}</span>
          ))}
        </p>
        {p.credited && <p className="wpanel__credit t-meta">Footer credit: KY Creatives</p>}
        <LiveLink project={p} />
      </div>
      <div className="wpanel__visual">
        <div className="wpanel__browser">
          <BrowserFrame
            domain={p.liveUrl ? domainOf(p.liveUrl) : undefined}
            {...wide}
            sizes="(min-width: 960px) 52vw, 92vw"
            alt={`${p.name} website home page`}
            ratio="16 / 10"
          />
        </div>
        {item.phone && (
          <div className="wpanel__phone">
            <PhoneFrame src={`/images/work/${item.phone}.webp`} alt={`${p.name} on a phone`} />
          </div>
        )}
      </div>
    </article>
  );
}

/** Text index of all other projects, with a preview image that follows the pointer. */
function ProjectIndex({ items }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(null);
  const previewRef = useRef(null);
  const listRef = useRef(null);
  const shown = expanded ? items : items.slice(0, INITIAL_INDEX);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || !previewRef.current) return;
    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.55, ease: "power3" });
    const rTo = gsap.quickTo(previewRef.current, "rotation", { duration: 0.8, ease: "power3" });
    const list = listRef.current;
    let lastX = 0;
    const onMove = (e) => {
      const r = list.getBoundingClientRect();
      const x = e.clientX - r.left;
      xTo(x);
      yTo(e.clientY - r.top);
      // A slight tilt in the direction of travel makes the card feel carried.
      rTo(gsap.utils.clamp(-6, 6, (x - lastX) * 0.4));
      lastX = x;
    };
    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pindex">
      <div className="pindex__head t-meta" aria-hidden="true">
        <span>Project</span>
        <span>Sector</span>
        <span>Type</span>
        <span />
      </div>
      <div className="pindex__wrap" ref={listRef} onPointerLeave={() => setActive(null)}>
        <ul role="list" className="pindex__list">
          {shown.map((p, i) => (
            <li key={p.slug} className="pindex__row" onPointerEnter={() => setActive(p.slug)}>
              <span className="pindex__num t-meta" aria-hidden="true">
                {String(i + 6).padStart(2, "0")}
              </span>
              <span className="pindex__name">{p.name}</span>
              <span className="pindex__sector">{p.sector}</span>
              <span className="pindex__kind t-meta">{p.kind}</span>
              <span className="pindex__link">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${p.name} website (opens in a new tab)`}
                  >
                    <span className="pindex__live t-meta">Live</span>
                    <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="pindex__archived t-meta">Portfolio</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className={`pindex__preview ${active ? "is-on" : ""}`} ref={previewRef} aria-hidden="true">
          {items.map((p) => (
            <img
              key={p.slug}
              src={p.image}
              alt=""
              loading="lazy"
              width="520"
              height="650"
              className={active === p.slug ? "is-on" : ""}
            />
          ))}
        </div>
      </div>
      {items.length > INITIAL_INDEX && (
        <button className="btn btn--ghost pindex__more" aria-expanded={expanded} onClick={() => setExpanded((e) => !e)}>
          {expanded ? "Show fewer projects" : `Show all ${items.length} projects`}
        </button>
      )}
    </div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const featuredSlugs = FEATURED.map((f) => f.slug);
  const rest = projects.filter((p) => !featuredSlugs.includes(p.slug));
  rest.sort((a, b) => Number(!!b.liveUrl) - Number(!!a.liveUrl));

  // Stacking: while the next panel slides over, the current one recedes.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      // Matches the CSS: panels stack on wide screens, and on smaller screens
      // tall enough for a whole panel to stay in view.
      mm.add("(min-width: 960px), (min-height: 640px)", () => {
        const panels = gsap.utils.toArray(".wpanel", ref.current);
        panels.slice(0, -1).forEach((panel, i) => {
          const next = panels[i + 1];
          const st = { trigger: next, start: "top bottom", end: "top 20%", scrub: true };
          gsap.to(panel, { scale: 0.92, ease: "none", scrollTrigger: st });
          gsap.to(panel.querySelector(".wpanel__shade"), { opacity: 0.55, ease: "none", scrollTrigger: st });
        });
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelector(".wpanel__phone"),
            { yPercent: 18 },
            { yPercent: -10, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="work" className="work on-dark" ref={ref} data-tone="dark" aria-labelledby="work-title">
      <div className="container">
        <div className="work__head">
          <p className="kicker kicker--aqua t-meta">Selected work</p>
          <div id="work-title">
            <SplitHeading as="h2" className="work__title" lines={["Stores and sites", "already in business."]} />
          </div>
          <p className="work__lead" data-reveal="up">
            A selection from the {projects.length} websites in our portfolio. Every screen here is a real client site,
            captured live.
          </p>
        </div>

        <div className="work__stack">
          {FEATURED.map((item, i) => (
            <Panel key={item.slug} item={item} index={i} total={FEATURED.length} />
          ))}
        </div>

        <div className="work-index">
          <div className="work-index__head">
            <h3 className="work-index__title">More from the portfolio</h3>
            <p className="t-meta">Company sites, portals, news and non-profits</p>
          </div>
          <ProjectIndex items={rest} />
        </div>
      </div>
    </section>
  );
}
