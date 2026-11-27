import { useEffect, useRef, useState } from "react";
import { gsap, markReady, prefersReducedMotion } from "../../lib/motion";
import { lockScroll } from "../../lib/smooth";

const HOLD_MS = 350; // the finished logo rests a moment before leaving
const MAX_MS = 4000; // hard ceiling: the visitor can never be stuck here

/**
 * "Spin and split" first-load screen, built from the KY Creatives logo.
 * The flame spins in at the centre and lands with a slight overshoot, then
 * slides to its place as "KY" and "Creatives" slide out from behind it, and
 * the three services settle in beneath.
 * The screen leaves once the page's fonts and critical images are ready.
 * Shown on every full load, never during in-app navigation, and skipped
 * with reduced motion.
 */
export default function LoadingScreen() {
  const [show, setShow] = useState(() => !prefersReducedMotion());
  const rootRef = useRef(null);

  useEffect(() => {
    if (!show) {
      markReady();
      return;
    }
    lockScroll(true);
    const root = rootRef.current;
    const q = (s) => root.querySelector(s);
    let finished = false;

    // the logo sequence; starts on the first quiet frame, so a busy first
    // render never skips it
    const intro = gsap
      .timeline({ paused: true, defaults: { ease: "power3.out" } })
      // the flame spins in, one and a half turns, and lands with a slight overshoot
      .fromTo(
        q(".lor__flame"),
        { xPercent: 205, rotate: -540, scale: 0.2, opacity: 0, filter: "blur(6px)" },
        { rotate: 0, scale: 1.12, opacity: 1, filter: "blur(0px)", duration: 1.05, ease: "expo.out" },
        0
      )
      // a soft glow breathes behind the flame while it spins
      .fromTo(q(".lor__glow"), { xPercent: -50, yPercent: -50, scale: 0.4, opacity: 0 }, { scale: 1.15, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.05)
      .to(q(".lor__glow"), { scale: 1.6, opacity: 0, duration: 0.9, ease: "power2.inOut" }, 0.85)
      .to(q(".lor__flame"), { scale: 1, duration: 0.3, ease: "power2.out" }, 1.0)
      // it slides to its place and "KY" then "Creatives" slide out from behind it
      .to(q(".lor__flame"), { xPercent: 0, duration: 0.7, ease: "power3.inOut" }, 1.05)
      .fromTo(q(".lor__ky"), { xPercent: -90, clipPath: "inset(0 100% 0 0)", opacity: 0, filter: "blur(4px)" }, { xPercent: 0, clipPath: "inset(0 0% 0 0)", opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 1.3)
      .fromTo(q(".lor__cr"), { xPercent: -45, clipPath: "inset(0 100% 0 0)", opacity: 0, filter: "blur(4px)" }, { xPercent: 0, clipPath: "inset(0 0% 0 0)", opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 1.42)
      // a fine light passes across the finished logo
      .fromTo(q(".lor__sheen"), { backgroundPosition: "130% 0" }, { backgroundPosition: "-30% 0", duration: 0.9, ease: "power2.inOut" }, 2.05)
      // the services settle in beneath
      .fromTo(q(".lor__services"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.6 }, 1.85);
    let raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => intro.play())));

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

    const finish = () => {
      if (finished) return;
      finished = true;
      intro.progress(1); // a slow network never cuts the logo mid-move
      gsap
        .timeline({
          delay: 0.1,
          onComplete: () => {
            lockScroll(false);
            setShow(false);
          },
        })
        .to(q(".lor__services"), { opacity: 0, y: -6, duration: 0.35, ease: "power2.in" }, 0)
        .to(q(".lor__logo"), { opacity: 0, y: -18, filter: "blur(4px)", duration: 0.5, ease: "power2.in" }, 0.05)
        .call(() => markReady(), null, 0.4)
        .set(root, { pointerEvents: "none" }, 0.4)
        // the screen lifts away like a curtain, revealing the page
        .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.75, ease: "power4.inOut" }, 0.4);
    };

    // leave once the page is ready AND the logo sequence has played through
    const introDone = new Promise((res) => intro.eventCallback("onComplete", res));
    const all = Promise.all([...tasks, introDone]).then(() => setTimeout(finish, HOLD_MS));
    const ceiling = setTimeout(finish, MAX_MS);

    return () => {
      clearTimeout(ceiling);
      cancelAnimationFrame(raf);
      intro.kill();
      void all;
      if (!finished) lockScroll(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div className="lor" ref={rootRef} role="status" aria-live="polite" aria-label="Loading KY Creatives">
      <div className="lor__center">
        <div className="lor__logo" role="img" aria-label="KY Creatives">
          <span className="lor__glow" aria-hidden="true" />
          <span className="lor__flame" />
          <span className="lor__ky" />
          <span className="lor__cr" />
          <span className="lor__sheen" aria-hidden="true" />
        </div>
        <p className="lor__services" aria-hidden="true">
          E-commerce <span>·</span> Mobile apps <span>·</span> Custom software
        </p>
      </div>
    </div>
  );
}
