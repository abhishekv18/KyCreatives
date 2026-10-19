import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, whenReady, prefersReducedMotion } from "../../lib/motion";
import { company } from "../../data/site";

const CAPS = ["Software", "Web apps", "Mobile apps", "D2C websites"];
const COLUMNS = 12;

/*
  Centred typographic hero on Cloud. Behind it: two very soft brand lights
  (Violet upper left, Flame lower right), a fine grain, and the site's own
  12-column grid drawn as hairlines with corner marks, like a layout sheet.
  The grid draws in once; everything is readable within about a second.
*/
export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const lines = q(".hero__title .split-line > span");
      const fades = q(".hero__fade");
      const word = q(".hero__word")[0];
      const rules = q(".hero__col");
      const marks = q(".hero__mark");

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0, y: 0 });
        return;
      }

      gsap.set(lines, { yPercent: 115, y: 0 });
      gsap.set(fades, { opacity: 0, y: 12 });
      gsap.set(word, { backgroundPosition: "100% 50%" });
      gsap.set(rules, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(marks, { opacity: 0, scale: 0.6 });

      let alive = true;
      whenReady().then(() => {
        if (!alive) return;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          // The layout sheet draws first, from the centre column outwards...
          .to(rules, { scaleY: 1, duration: 1.4, ease: "power2.inOut", stagger: { each: 0.05, from: "center" } }, 0)
          .to(marks, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.06 }, 0.6)
          // ...then the type is set on it.
          .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" }, 0.2)
          .to(word, { backgroundPosition: "0% 50%", duration: 1.6, ease: "power2.inOut" }, 0.5)
          .to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.5);
      });

      // As the manifesto sheet slides over, the opening steps back a little.
      const sheet = document.querySelector(".manifesto");
      if (sheet) {
        gsap.to(q(".hero__inner"), {
          scale: 0.95,
          yPercent: -3,
          opacity: 0.4,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: sheet, start: "top bottom", end: "top top", scrub: 0.5 },
        });
      }

      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );

  return (
    <section className="hero" ref={ref} data-tone="light" aria-labelledby="hero-title">
      {/* Background: brand light, grain, and the 12-column layout sheet */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__light hero__light--violet" />
        <span className="hero__light hero__light--flame" />
        <span className="hero__grain" />
        <div className="container hero__sheet">
          {Array.from({ length: COLUMNS + 1 }, (_, i) => (
            <i key={i} className="hero__col" style={{ "--i": i }} />
          ))}
          <span className="hero__mark hero__mark--tl" />
          <span className="hero__mark hero__mark--tr" />
          <span className="hero__mark hero__mark--bl" />
          <span className="hero__mark hero__mark--br" />
        </div>
      </div>

      <div className="container hero__inner">
        <div className="hero__center">
          <p className="hero__top t-meta hero__fade">
            <span className="hero__top-brand">
              KY Creatives<span aria-hidden="true"> · </span>
            </span>
            Design-led studio<span aria-hidden="true"> · </span>Est. {company.foundedYear}
          </p>

          <h1 id="hero-title" className="hero__title" aria-label="What we create is business." data-reveal-manual="">
            <span className="split-line" aria-hidden="true">
              <span>What we create</span>
            </span>
            <span className="split-line" aria-hidden="true">
              <span>
                is <em className="hero__word">business.</em>
              </span>
            </span>
          </h1>

          <p className="hero__sub hero__fade">Design-led software, web and mobile apps.</p>
          <p className="hero__lead hero__fade">
            We design and build websites, apps and online stores for businesses around the world, with a special focus
            on D2C brands that need a store that sells.
          </p>
          <div className="hero__actions hero__fade">
            <Link to="/contact" className="btn btn--primary">
              <span>Start a project</span>
              <ArrowRight className="btn__icon" size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <a href="#work" className="btn btn--ghost">
              <span>See our work</span>
              <ArrowDown className="btn__icon" size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <ol role="list" className="hero__caps hero__fade">
          {CAPS.map((c, i) => (
            <li key={c}>
              <span className="t-meta">{String(i + 1).padStart(2, "0")}</span>
              {c}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
