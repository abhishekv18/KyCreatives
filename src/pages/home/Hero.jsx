import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, whenReady, prefersReducedMotion } from "../../lib/motion";
import { company } from "../../data/site";
import { projectBySlug } from "../../data/projects";

const CAPS = ["Software", "Web apps", "Mobile apps", "D2C websites"];

// The wall behind the headline: real client sites from the portfolio, five
// columns of three. Phones show the first three columns only.
const WALL = [
  ["thedecorshed", "australglazing", "newindia"],
  ["vibhadesigns", "pinkdinosaur", "globalayurveda"],
  ["petsway", "property-box", "nirmaltrends"],
  ["notahoax", "couponvolume", "rudrapolyplast"],
  ["unlikelifestyle", "maapitambara", "primeexpertsolution"],
].map((col) => col.map((slug) => projectBySlug[slug]).filter(Boolean));

/*
  Centred typographic hero on Ink. Behind the headline sits a tilted wall of
  real client sites, dimmed and fading into the dark, so the first thing a
  visitor sees is work we have shipped. A soft Violet light rests behind the
  headline and, with a mouse, follows the pointer slowly; a second glow sits
  low on the horizon. The wall drifts gently and steps back as the manifesto
  slides over. On touch screens and with reduced motion it stays at rest.
*/
export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const lines = q(".hero__title .split-line > span");
      const fades = q(".hero__fade");
      const word = q(".hero__word")[0];

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0, y: 0 });
        return;
      }

      // The light follows a mouse with a slow lag and settles back on leave.
      const hero = ref.current;
      const lamp = q(".hero__lamp")[0];
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let offLamp = () => {};
      if (fine && lamp) {
        const xTo = gsap.quickTo(lamp, "x", { duration: 1.4, ease: "power3" });
        const yTo = gsap.quickTo(lamp, "y", { duration: 1.4, ease: "power3" });
        const onMove = (e) => {
          const r = hero.getBoundingClientRect();
          // offsets from the resting point (centre, 42% down; see CSS)
          xTo(e.clientX - r.left - r.width * 0.5);
          yTo(e.clientY - r.top - r.height * 0.42);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);
        offLamp = () => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
        };
      }

      gsap.set(lines, { yPercent: 115, y: 0 });
      gsap.set(fades, { opacity: 0, y: 12 });
      gsap.set(word, { backgroundPosition: "100% 50%" });

      let alive = true;
      whenReady().then(() => {
        if (!alive) return;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" }, 0)
          .to(word, { backgroundPosition: "0% 50%", duration: 1.6, ease: "power2.inOut" }, 0.3)
          .to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.3);
      });

      // As the manifesto sheet slides over, the opening steps back a little.
      const sheet = document.querySelector(".manifesto");
      if (sheet) {
        gsap.to(q(".hero__wall"), {
          yPercent: -6,
          scale: 1.04,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: sheet, start: "top bottom", end: "top top", scrub: 0.8 },
        });
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
        offLamp();
      };
    },
    { scope: ref }
  );

  return (
    <section className="hero on-dark" ref={ref} data-tone="dark" aria-labelledby="hero-title">
      <div className="hero__wall" aria-hidden="true">
        <div className="hero__wall-grid">
          {WALL.map((col, c) => (
            <div key={c} className="hero__wall-col">
              {col.map((p) => (
                <img
                  key={p.slug}
                  src={p.image}
                  alt=""
                  width="720"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__lamp" aria-hidden="true" />
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
