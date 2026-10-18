import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { projects } from "../../data/projects";
import { company } from "../../data/site";
import { gsap, prefersReducedMotion } from "../../lib/motion";

function Row({ items, cls }) {
  return (
    <div className={`band__row ${cls}`}>
      <div className="band__track">
        {[...items, ...items].map((n, i) => (
          <span key={i} className="band__name" aria-hidden={i >= items.length ? "true" : undefined}>
            {n}
            <i className="band__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/*
  Real client names from the portfolio, set large in two rows that slide in
  opposite directions as the page scrolls. The motion is tied to scroll
  position (no autoplay), so it stops when the visitor stops.
*/
export default function ClientBand() {
  const ref = useRef(null);
  const names = projects.map((p) => p.name);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.5 };
      gsap.fromTo(".band__row--a .band__track", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: st });
      gsap.fromTo(".band__row--b .band__track", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    },
    { scope: ref }
  );

  return (
    <section className="band" ref={ref} data-tone="light" aria-labelledby="band-title">
      <div className="container band__head">
        <h2 id="band-title" className="t-meta">
          Websites we have designed and built, since {company.foundedYear}
        </h2>
        <span className="t-meta band__count">{projects.length} in the portfolio</span>
      </div>
      <Row items={names.slice(0, 11)} cls="band__row--a" />
      <Row items={names.slice(11)} cls="band__row--b" />
    </section>
  );
}
