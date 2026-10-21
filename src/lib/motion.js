import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE = "power3.out";
export const EASE_IN_OUT = "power2.inOut";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* App readiness: resolved when the loader has finished (or was skipped).
   Hero entrances wait for this so they play once, in view. */
let resolveReady;
const readyPromise = new Promise((r) => (resolveReady = r));
export const markReady = () => resolveReady();
export const whenReady = () => readyPromise;

/* heroPin.end: scroll position where a pinned hero sequence ends (0 when
   there is none), so the header never hides during one. */
export const heroPin = { end: 0 };

/*
  Reveals play once and never reverse. This is done with toggleActions rather
  than once: true on purpose: a once trigger kills itself the moment it fires,
  and when a new page creates many triggers together, one that is already in
  view can fire during ScrollTrigger's own refresh pass, shrink its trigger
  list mid-loop and throw "Cannot read properties of undefined (reading 'end')".
  Live triggers are removed with the page's GSAP context instead.
*/
const PLAY_ONCE = { toggleActions: "play none none none" };

/*
  Declarative scroll reveals, scoped to a container.
  Markup hooks:
    data-reveal="up"     fade + 24px rise
    data-reveal="fade"   fade only
    data-reveal="clip"   clip-path wipe from the bottom, image inside eases from 1.08
    data-split           container of .split-line > span lines, rising in sequence
    data-stagger         direct children of this element rise in sequence
    data-parallax="n"    yPercent drift while the element crosses the viewport
  Elements with data-reveal-manual are left for page-specific timelines.
*/
export function initReveals(root) {
  if (!root) return;
  if (prefersReducedMotion()) {
    gsap.set(root.querySelectorAll("[data-reveal], .split-line > span, [data-draw]"), { clearProps: "all" });
    return;
  }

  const q = (sel) => Array.from(root.querySelectorAll(sel)).filter((el) => !el.closest("[data-reveal-manual]"));

  q('[data-reveal="up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: "top 88%", ...PLAY_ONCE },
      }
    );
  });

  q('[data-reveal="fade"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: "top 90%", ...PLAY_ONCE },
      }
    );
  });

  q('[data-reveal="clip"]').forEach((el) => {
    const media = el.querySelector("img, .clip-media");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", ...PLAY_ONCE } });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out" });
    if (media) tl.fromTo(media, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
  });

  // Horizontal wipe: used for wide image stages so not every reveal rises from below.
  q('[data-reveal="wipe"]').forEach((el) => {
    const media = el.querySelector("img, .clip-media");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", ...PLAY_ONCE } });
    tl.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" });
    if (media) tl.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0.1);
  });

  // SVG line drawing. Paths carry pathLength="1" so dash maths is unit-free.
  // Containers marked data-draw-scrub tie the drawing to scroll position instead.
  q("[data-draw-scrub]").forEach((wrap) => {
    const paths = wrap.querySelectorAll("[data-draw]");
    gsap.fromTo(
      paths,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: wrap, start: "top 85%", end: "bottom 40%", scrub: 0.6 },
      }
    );
  });
  q("[data-draw]")
    .filter((p) => !p.closest("[data-draw-scrub]"))
    .forEach((p) => {
      gsap.fromTo(
        p,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: { trigger: p.closest("svg") || p, start: "top 85%", ...PLAY_ONCE },
        }
      );
    });

  q("[data-split]").forEach((el) => {
    const lines = el.querySelectorAll(".split-line > span");
    gsap.fromTo(
      lines,
      { yPercent: 105, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: "top 88%", ...PLAY_ONCE },
      }
    );
  });

  q("[data-stagger]").forEach((el) => {
    const items = Array.from(el.children);
    gsap.set(items, { opacity: 0, y: 20 });
    let played = false;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (played) return;
        played = true;
        gsap.to(items, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.07 });
      },
    });
  });

  // Parallax only on larger screens; on phones native scroll stays untouched.
  const mm = gsap.matchMedia();
  mm.add("(min-width: 960px)", () => {
    q("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 10;
      gsap.fromTo(
        el,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
  });
}

// Refresh trigger positions once late images have settled the layout.
export function refreshOnImages(root) {
  if (!root) return () => {};
  const imgs = Array.from(root.querySelectorAll("img")).filter((i) => !i.complete);
  let pending = imgs.length;
  if (!pending) return () => {};
  let timer;
  const done = () => {
    pending -= 1;
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 120);
  };
  imgs.forEach((i) => {
    i.addEventListener("load", done, { once: true });
    i.addEventListener("error", done, { once: true });
  });
  return () => {
    clearTimeout(timer);
    imgs.forEach((i) => {
      i.removeEventListener("load", done);
      i.removeEventListener("error", done);
    });
  };
}

export { gsap, ScrollTrigger };
