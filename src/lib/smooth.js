import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

/*
  Smooth scrolling with Lenis (the engine behind Locomotive Scroll v5).
  Lenis keeps the native scroll position, so keyboard, find-in-page, anchors
  and screen readers behave normally. It is enabled only for fine pointers
  (mouse / trackpad) and never with reduced motion: touch scrolling stays native.
*/
let lenis = null;

export function startSmoothScroll() {
  if (lenis || typeof window === "undefined") return lenis;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer || prefersReducedMotion()) return null;

  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis && lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  lenis.__tick = tick;
  return lenis;
}

export function stopSmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(lenis.__tick);
  lenis.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
