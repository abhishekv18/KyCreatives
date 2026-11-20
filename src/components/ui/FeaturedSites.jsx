import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectBySlug, shotSrc } from "../../data/projects";
import { prefersReducedMotion } from "../../lib/motion";

const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
const HOLD = 5200;

/*
  The opening of the websites portfolio: three stores shown large, one at a
  time, in a browser window. The tabs on the left name each one and fill as it
  plays; picking a tab jumps to it. With reduced motion the tabs just switch.
*/
export default function FeaturedSites({ slugs }) {
  const items = slugs.map((s) => projectBySlug[s]).filter(Boolean);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const still = prefersReducedMotion();

  useEffect(() => {
    if (still || paused) return;
    const id = setTimeout(() => setI((k) => (k + 1) % items.length), HOLD);
    return () => clearTimeout(id);
  }, [i, paused, still, items.length]);

  const cur = items[i];
  return (
    <section className="fsites" data-tone="light" aria-labelledby="fsites-title">
      <div className="container fsites__grid" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="fsites__side">
          <p className="kicker t-meta">Featured</p>
          <h2 id="fsites-title" className="fsites__title">
            Stores that sell
            <br />
            <span>every day.</span>
          </h2>
          <ol role="list" className="fsites__tabs">
            {items.map((p, k) => (
              <li key={p.slug}>
                <button
                  type="button"
                  className={k === i ? "is-on" : ""}
                  aria-pressed={k === i}
                  onClick={() => setI(k)}
                  style={{ "--hold": `${HOLD}ms` }}
                >
                  <span className="fsites__n t-meta">{String(k + 1).padStart(2, "0")}</span>
                  <span className="fsites__name">{p.name}</span>
                  <span className="fsites__sector">{p.sector}</span>
                  <span className={`fsites__bar ${paused || still ? "is-still" : ""}`} aria-hidden="true">
                    <i key={k === i ? `on-${i}` : "off"} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="fsites__stage">
          <div className="fsites__window">
            <div className="fsites__bar-top" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{domainOf(cur.liveUrl)}</span>
            </div>
            <div className="fsites__shots">
              {items.map((p, k) => {
                const s = shotSrc(p.slug, "wide");
                return (
                  <img
                    key={p.slug}
                    src={s.src}
                    srcSet={s.srcSet}
                    sizes="(min-width: 960px) 60vw, 92vw"
                    alt={k === i ? `${p.name} website home page` : ""}
                    aria-hidden={k === i ? undefined : "true"}
                    width="1440"
                    height="900"
                    loading={k === 0 ? "eager" : "lazy"}
                    className={k === i ? "is-on" : ""}
                  />
                );
              })}
            </div>
          </div>
          <div className="fsites__caption">
            <p>{cur.summary}</p>
            <a href={cur.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit {domainOf(cur.liveUrl)}
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
