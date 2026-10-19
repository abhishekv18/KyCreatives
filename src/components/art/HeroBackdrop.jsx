import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, whenReady, prefersReducedMotion } from "../../lib/motion";

const COLUMNS = 12;

/*
  The studio's hero backdrop, shared by inner pages: two very soft brand
  lights (Violet upper left, Flame lower right), a fine grain, and the
  12-column grid drawn as hairlines with corner marks. Lines draw in once.
*/
export default function HeroBackdrop() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      const rules = q(".hero__col");
      const marks = q(".hero__mark");
      gsap.set(rules, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(marks, { opacity: 0, scale: 0.6 });
      let alive = true;
      whenReady().then(() => {
        if (!alive) return;
        gsap
          .timeline()
          .to(rules, { scaleY: 1, duration: 1.4, ease: "power2.inOut", stagger: { each: 0.05, from: "center" } }, 0)
          .to(marks, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" }, 0.6);
      });
      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );

  return (
    <div className="hero__bg" ref={ref} aria-hidden="true">
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
  );
}
