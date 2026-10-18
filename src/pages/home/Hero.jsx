import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import BrowserFrame from "../../components/ui/BrowserFrame";
import { Waves, Stroke } from "../../components/art/Art";
import { gsap, whenReady, prefersReducedMotion } from "../../lib/motion";
import { shotSrc } from "../../data/projects";
import { company } from "../../data/site";

/*
  Light editorial hero. Cloud field, Ink headline in Libre Baskerville, the
  layered-wave artwork cresting from the right with its own space, and one
  small live client card resting on the waves as quiet proof.
*/
export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      const lines = q(".hero__title .split-line > span");
      const waves = q("[data-wave]");
      gsap.set(lines, { yPercent: 108, y: 0 });
      gsap.set(q(".hero__fade"), { opacity: 0, y: 16 });
      gsap.set(waves, { opacity: 0, y: 60 });
      gsap.set(q(".hero__card"), { opacity: 0, y: 30 });
      gsap.set(q(".hero__title [data-draw]"), { strokeDashoffset: 1 });

      let cancelled = false;
      whenReady().then(() => {
        if (cancelled) return;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          // Sheets settle one after another, back to front.
          .to(waves, { opacity: 1, y: 0, duration: 1.6, stagger: 0.09 }, 0)
          .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.12, ease: "power4.out" }, 0.15)
          .to(q(".hero__title [data-draw]"), { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 0.85)
          .to(q(".hero__fade"), { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.55)
          .to(q(".hero__card"), { opacity: 1, y: 0, duration: 1.1 }, 1.0);
      });

      // Restrained scroll response: front sheets drift faster than back ones,
      // giving depth without moving the type. Desktop only, transform only.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        waves.forEach((w, i) => {
          gsap.to(w, { y: -(10 + i * 14), ease: "none", scrollTrigger: st, immediateRender: false });
        });
        gsap.to(q(".hero__card"), { y: -70, ease: "none", scrollTrigger: st, immediateRender: false });
      });
      return () => {
        cancelled = true;
      };
    },
    { scope: ref }
  );

  const site = shotSrc("thedecorshed", "wide");

  return (
    <section className="hero" ref={ref} data-tone="light" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <Waves />
      </div>

      <div className="container hero__layout">
        <div className="hero__copy">
          <ul role="list" className="hero__meta t-meta hero__fade">
            <li>Design-led studio</li>
            <li>Est. {company.foundedYear}</li>
            <li>{company.address.short} to worldwide</li>
          </ul>

          <h1 id="hero-title" className="hero__title" aria-label="What we create is business." data-reveal-manual="">
            <span className="split-line" aria-hidden="true">
              <span>What we create</span>
            </span>
            <span className="split-line hero__line-2" aria-hidden="true">
              <span>is business.</span>
              <Stroke className="hero__stroke" />
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

        <figure className="hero__card">
          <BrowserFrame
            domain="thedecorshed.com"
            {...site}
            sizes="(min-width: 900px) 24vw, 70vw"
            alt="The Decorshed online store home page"
            loading="eager"
            fetchPriority="high"
            ratio="16 / 10"
            imgProps={{ "data-critical": "" }}
          />
          <figcaption>
            <span className="hero__live">Live</span>
            <span>The Decorshed, D2C store by KY Creatives</span>
          </figcaption>
        </figure>

        <ul role="list" className="hero__caps t-meta hero__fade">
          <li>Software</li>
          <li>Web apps</li>
          <li>Mobile apps</li>
          <li>D2C websites</li>
        </ul>
      </div>
    </section>
  );
}
