import { useEffect, useRef, useState } from "react";
import { gsap, markReady, prefersReducedMotion } from "../../lib/motion";
import { lockScroll } from "../../lib/smooth";

const MIN_MS = 600; // long enough to avoid a flash, short enough not to be a wait
const MAX_MS = 2200; // hard ceiling: the visitor can never be stuck here

/**
 * Light first-load screen: the official logo on a white-to-Cloud field with
 * soft pastel light, a short line and a Flame progress bar. Progress reflects
 * real work: web fonts plus the page's critical images (marked data-critical).
 * On exit the bar travels to the centre and collapses into a point, and the
 * screen dissolves around it. Shown on every full load, never during in-app
 * navigation, and skipped with reduced motion.
 */
export default function LoadingScreen() {
  const [show, setShow] = useState(() => !prefersReducedMotion());
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    if (!show) {
      markReady();
      return;
    }
    lockScroll(true);
    const start = performance.now();
    let finished = false;
    let shown = 0;

    const setProgress = (p) => {
      const target = Math.max(shown, Math.min(1, p));
      gsap.to(barRef.current, { scaleX: target, duration: 0.5, ease: "power2.out", overwrite: true });
      const obj = { v: shown };
      gsap.to(obj, {
        v: target,
        duration: 0.5,
        ease: "power1.out",
        onUpdate: () => {
          if (pctRef.current) pctRef.current.textContent = `${Math.round(obj.v * 100)}%`;
        },
      });
      shown = target;
    };

    // Work to wait for: fonts + critical images currently in the DOM.
    const imgs = Array.from(document.querySelectorAll("img[data-critical]"));
    const tasks = [document.fonts ? document.fonts.ready : Promise.resolve()];
    imgs.forEach((img) => {
      tasks.push(
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true }); // a broken image must not block the site
            })
      );
    });
    let done = 0;
    tasks.forEach((t) => t.then(() => setProgress(++done / tasks.length)));

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      const root = rootRef.current;
      const out = () => {
        lockScroll(false);
        markReady();
        setShow(false);
      };
      // The progress bar travels to the centre of the screen and collapses into
      // a single point; the light field then dissolves around it while the
      // point blooms and fades, handing over to the page.
      const track = root.querySelector(".loader__track");
      const dot = root.querySelector(".loader__dot");
      const r = track.getBoundingClientRect();
      const dx = window.innerWidth / 2 - (r.left + r.width / 2);
      const dy = window.innerHeight / 2 - (r.top + r.height / 2);
      gsap
        .timeline({ delay: 0.1, onComplete: out })
        .to(root.querySelectorAll(".loader__brand, .loader__labels"), {
          opacity: 0,
          y: -12,
          duration: 0.3,
          ease: "power2.in",
          stagger: 0.05,
        })
        .to(track, { x: dx, y: dy, backgroundColor: "rgba(23,18,31,0)", duration: 0.5, ease: "power3.inOut" }, 0.08)
        .to(track, { scaleX: 0.02, duration: 0.3, ease: "power3.in" }, 0.38)
        .fromTo(dot, { scale: 0, opacity: 1 }, { scale: 1, duration: 0.2, ease: "power2.out" }, 0.62)
        .set(track, { opacity: 0 }, 0.66)
        .set(root, { pointerEvents: "none" }, 0.68)
        .call(() => markReady(), null, 0.68)
        .to(root.querySelector(".loader__lights"), { opacity: 0, duration: 0.3, ease: "power1.out" }, 0.62)
        .to(root.querySelector(".loader__bg"), { opacity: 0, duration: 0.4, ease: "power1.out" }, 0.68)
        .to(dot, { opacity: 0, scale: 2.2, duration: 0.45, ease: "power2.out" }, 0.78);
    };

    const all = Promise.all(tasks).then(() => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(finish, wait);
    });
    const ceiling = setTimeout(finish, MAX_MS);

    return () => {
      clearTimeout(ceiling);
      void all;
      if (!finished) lockScroll(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div className="loader" ref={rootRef} role="status" aria-live="polite" aria-label="Loading KY Creatives">
      <div className="loader__bg" aria-hidden="true" />
      <div className="loader__lights" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="loader__brand">
        <img
          className="loader__logo"
          src="/brand/ky-creatives-logo.png"
          width="285"
          height="79"
          alt="KY Creatives"
          decoding="async"
        />
        <p className="loader__line" aria-hidden="true">
          <span>
            What we create is <em>business.</em>
          </span>
        </p>
      </div>
      <div className="loader__meta" aria-hidden="true">
        <div className="loader__track">
          <div className="loader__bar" ref={barRef} />
        </div>
        <div className="loader__labels t-meta">
          <span>Design-led studio · Est. 2017</span>
          <span ref={pctRef}>0%</span>
        </div>
      </div>
      <span className="loader__dot" aria-hidden="true" />
    </div>
  );
}
