import { useEffect, useRef, useState } from "react";
import { gsap, markReady, prefersReducedMotion } from "../../lib/motion";
import { lockScroll } from "../../lib/smooth";

const MIN_MS = 1700; // long enough for one full pass of light across the logo
const MAX_MS = 2600; // hard ceiling: the visitor can never be stuck here

/**
 * "Quiet signature" first-load screen: the KY Creatives logo on white, a soft
 * violet light passing across it, a hairline that opens from the centre as
 * the page's fonts and critical images load, and the three services in small
 * capitals beneath. On exit the full hairline draws back into the centre
 * and the screen fades away. Shown on every full load, never during in-app navigation, and
 * skipped with reduced motion.
 */
export default function LoadingScreen() {
  const [show, setShow] = useState(() => !prefersReducedMotion());
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!show) {
      markReady();
      return;
    }
    lockScroll(true);
    const root = rootRef.current;
    const start = performance.now();
    let finished = false;
    let shown = 0;

    // entrance: logo settles in, services fade up after it
    gsap.fromTo(root.querySelector(".lsig__logo"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
    gsap.fromTo(root.querySelector(".lsig__services"), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.35, ease: "power1.out" });

    const setProgress = (p) => {
      const target = Math.max(shown, Math.min(1, p));
      gsap.to(lineRef.current, { scaleX: target, duration: 0.6, ease: "power2.out", overwrite: true });
      shown = target;
    };

    // work to wait for: fonts plus the critical images already in the page
    const imgs = Array.from(document.querySelectorAll("img[data-critical]"));
    const tasks = [document.fonts ? document.fonts.ready : Promise.resolve()];
    imgs.forEach((img) => {
      tasks.push(
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
            })
      );
    });
    let done = 0;
    setProgress(0.12);
    tasks.forEach((t) => t.then(() => setProgress(0.12 + (++done / tasks.length) * 0.88)));

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      gsap
        .timeline({
          delay: 0.25,
          onComplete: () => {
            lockScroll(false);
            setShow(false);
          },
        })
        // the full line holds a beat, then draws back into the centre
        .to(root.querySelector(".lsig__rule"), { scaleX: 0, duration: 0.55, ease: "power3.inOut" }, 0.35)
        .to(root.querySelectorAll(".lsig__logo, .lsig__services"), { opacity: 0, y: -8, duration: 0.45, ease: "power2.in", stagger: 0.05 }, 0.4)
        .call(() => markReady(), null, 0.75)
        .set(root, { pointerEvents: "none" }, 0.75)
        .to(root, { opacity: 0, duration: 0.45, ease: "power1.out" }, 0.8);
    };

    const all = Promise.all(tasks).then(() => {
      setTimeout(finish, Math.max(0, MIN_MS - (performance.now() - start)));
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
    <div className="lsig" ref={rootRef} role="status" aria-live="polite" aria-label="Loading KY Creatives">
      <div className="lsig__center">
        <span className="lsig__logo">
          <img src="/brand/ky-creatives-logo.png" width="285" height="79" alt="KY Creatives" decoding="async" />
        </span>
        <span className="lsig__rule" aria-hidden="true">
          <i ref={lineRef} />
        </span>
        <p className="lsig__services" aria-hidden="true">
          E-commerce <span>·</span> Mobile apps <span>·</span> Custom software
        </p>
      </div>
    </div>
  );
}
