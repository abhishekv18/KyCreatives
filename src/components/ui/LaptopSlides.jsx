import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/*
  The consultation laptop: the website designs from the studio's earlier site,
  cross-fading one into the next with a slow push-in on each. Every section
  starts on a different design; with reduced motion the screen stays still.
*/
const DESIGNS = [1, 2, 3, 4, 5, 6].map((n) => `/images/laptop/design-${n}.webp`);
const START = { web: 0, d2c: 1, mobile: 2, portals: 3, marketing: 4, design: 5, portfolio: 2 };
const HOLD = 3800;

export default function LaptopSlides({ theme = "web" }) {
  const [i, setI] = useState(START[theme] ?? 0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setI((n) => (n + 1) % DESIGNS.length), HOLD);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="laptop" aria-hidden="true">
      <div className="laptop__lid">
        <span className="laptop__cam" />
        <div className="laptop__screen">
          <div className="laptop__slides">
            {DESIGNS.map((src, n) => (
              <div
                key={src}
                className="laptop__slide"
                data-state={n === i ? "on" : n === (i - 1 + DESIGNS.length) % DESIGNS.length ? "out" : "in"}
              >
                <img src={src} alt="" width="618" height="386" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <span className="laptop__pips">
            {DESIGNS.map((src, n) => (
              <i key={src} className={n === i ? "is-on" : ""} />
            ))}
          </span>
        </div>
      </div>
      <div className="laptop__base">
        <span className="laptop__notch" />
      </div>
    </div>
  );
}
