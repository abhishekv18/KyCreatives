import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import SplitHeading from "../../components/ui/SplitHeading";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/motion";
import { process as steps } from "../../data/services";

/**
 * The project process as a real sequence on a Violet field. A large numeral
 * stays beside the stages and turns over as each one is reached; a line fills
 * with scroll progress. No pinning: the page always scrolls normally.
 */
export default function Process({ title = ["From first call", "to launch, and after."], lead }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const items = ref.current.querySelectorAll(".proc__step");
      if (prefersReducedMotion()) {
        items.forEach((el) => el.classList.add("is-on"));
        return;
      }
      gsap.fromTo(
        ".proc__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".proc__steps", start: "top 60%", end: "bottom 60%", scrub: 0.4 },
        }
      );
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          onEnter: () => {
            el.classList.add("is-on");
            setCurrent(i);
          },
          onLeaveBack: () => {
            el.classList.remove("is-on");
            setCurrent(Math.max(0, i - 1));
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="proc on-dark grain" ref={ref} data-tone="dark" aria-labelledby="proc-title">
      <div className="container proc__grid">
        <div className="proc__intro">
          <p className="kicker kicker--aqua t-meta">How we work</p>
          <div id="proc-title">
            <SplitHeading as="h2" className="proc__title" lines={title} />
          </div>
          <p className="proc__lead" data-reveal="up">
            {lead ||
              "Five stages, each with a clear output you can review, so you know what we are working on and what we need from you."}
          </p>
          <div className="proc__counter" aria-hidden="true">
            <span key={current} className="proc__big">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="proc__of t-meta">
              {steps[current].title}
              <span className="proc__bars">
                {steps.map((s, i) => (
                  <i key={s.title} className={i <= current ? "is-on" : ""} />
                ))}
              </span>
            </span>
          </div>
        </div>
        <div className="proc__steps">
          <span className="proc__line" aria-hidden="true">
            <span className="proc__fill" />
          </span>
          <ol role="list" className="proc__ol">
            {steps.map((s, i) => (
              <li className="proc__step" key={s.title}>
                <span className="proc__num t-meta">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="proc__h">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
