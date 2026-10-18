import { useEffect, useRef, useState } from "react";
import { gsap, markReady, prefersReducedMotion } from "../../lib/motion";
import { lockScroll } from "../../lib/smooth";

const SEEN_KEY = "ky-intro-seen";
const MIN_MS = 650; // long enough to avoid a flash, short enough not to be a wait
const MAX_MS = 3500; // hard ceiling: the visitor can never be stuck here

function alreadySeen() {
  // With reduced motion the intro is skipped entirely: content first, no theatre.
  if (prefersReducedMotion()) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Branded first-load screen. Progress reflects real work: web fonts plus the
 * page's critical images (marked data-critical). Shown once per session.
 */
export default function LoadingScreen() {
  const [show, setShow] = useState(() => !alreadySeen());
  const [logoFailed, setLogoFailed] = useState(false);
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
    const reduced = prefersReducedMotion();
    let finished = false;
    let shown = 0;

    const setProgress = (p) => {
      const target = Math.max(shown, Math.min(1, p));
      gsap.to(barRef.current, { scaleX: target, duration: 0.4, ease: "power2.out", overwrite: true });
      const obj = { v: shown };
      gsap.to(obj, {
        v: target,
        duration: 0.4,
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
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage may be unavailable; the intro will simply show again */
      }
      const out = () => {
        lockScroll(false);
        markReady();
        setShow(false);
      };
      if (reduced) {
        gsap.to(rootRef.current, { autoAlpha: 0, duration: 0.2, onComplete: out });
        return;
      }
      gsap
        .timeline({ delay: 0.25, onComplete: out })
        .to(".loader__brand, .loader__meta", { autoAlpha: 0, y: -12, duration: 0.45, ease: "power2.in", stagger: 0.04 })
        .to(rootRef.current, { yPercent: -100, duration: 0.85, ease: "power3.inOut" }, "-=0.1")
        // Let the hero start rising underneath while the panel is still lifting.
        .call(() => markReady(), null, "-=0.55");
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
      <div className="loader__brand">
        <span className="loader__plate">
          {logoFailed ? (
            <span className="loader__wordmark">KY Creatives</span>
          ) : (
            <img
              src="/brand/ky-creatives-logo.png"
              width="285"
              height="79"
              alt="KY Creatives"
              onError={() => setLogoFailed(true)}
            />
          )}
        </span>
        <p className="loader__line">What we create is business.</p>
      </div>
      <div className="loader__meta">
        <div className="loader__track" aria-hidden="true">
          <div className="loader__bar" ref={barRef} />
        </div>
        <div className="loader__labels t-meta">
          <span>Loading</span>
          <span ref={pctRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
