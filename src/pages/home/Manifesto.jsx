import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

/*
  The studio's positioning (from the brand guidelines boilerplate), set as a
  statement. Words fill from a light tint to Ink as the reader scrolls through
  it, so the sentence is read at the pace of the scroll. The text is always
  real, readable text; only its colour changes.
*/
const STATEMENT = [
  ["We", "are"],
  ["designers", "and", "engineers", "in", "one", "team,"],
  ["turning", "ideas", "into", "products", "people", "enjoy", "using"],
  ["and", "businesses", "can", "grow", "on."],
];
const ACCENT = new Set(["designers", "engineers"]);
const FLAME = new Set(["grow"]);

export default function Manifesto() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = gsap.utils.toArray(".manifesto__w", ref.current);
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ".manifesto__text", start: "top 78%", end: "bottom 55%", scrub: 0.4 },
        }
      );
    },
    { scope: ref }
  );

  let n = 0;
  return (
    <section className="manifesto" ref={ref} data-tone="light" aria-labelledby="manifesto-title">
      <div className="container manifesto__inner">
        <h2 id="manifesto-title" className="manifesto__label t-meta">
          <span className="manifesto__rule" aria-hidden="true" />
          Who we are
        </h2>
        <p className="manifesto__text">
          {STATEMENT.flat().map((w) => {
            const key = n++;
            const cls = FLAME.has(w) ? " manifesto__w--flame" : ACCENT.has(w) ? " manifesto__w--accent" : "";
            return (
              <span key={key} className={`manifesto__w${cls}`}>
                {w}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
