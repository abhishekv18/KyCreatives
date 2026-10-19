import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

const INTERACTIVE = "a, button, [role='button'], label, summary, select, .choice__item";
const TEXT = "input:not([type='radio']):not([type='checkbox']), textarea, [contenteditable='true']";

/**
 * A quiet custom cursor for mouse users: an Ink dot that tracks the pointer
 * exactly and a thin Violet ring that follows with a gentle lag. The ring
 * grows over links and buttons, presses on click, hides over text fields
 * (the native text cursor returns there) and turns white over dark sections.
 * Touch devices and reduced-motion users keep the system cursor.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    root.classList.add("has-cursor");

    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const setState = (target) => {
      const onText = !!target.closest?.(TEXT);
      const onLink = !onText && !!target.closest?.(INTERACTIVE);
      const dark = target.closest?.("[data-tone]")?.dataset.tone === "dark";
      root.classList.toggle("cursor-link", onLink);
      root.classList.toggle("cursor-text", onText);
      root.classList.toggle("cursor-dark", dark);
    };

    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        root.classList.add("cursor-on");
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      setState(e.target);
    };
    const onLeave = () => {
      shown = false;
      root.classList.remove("cursor-on");
    };
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      root.classList.remove("has-cursor", "cursor-on", "cursor-link", "cursor-text", "cursor-dark", "cursor-down");
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__ring" ref={ringRef} />
      <span className="cursor__dot" ref={dotRef} />
    </div>
  );
}
