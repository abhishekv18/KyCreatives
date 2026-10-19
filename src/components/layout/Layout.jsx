import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import Header from "./Header";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import WhatsAppButton from "../ui/WhatsAppButton";
import Cursor from "../ui/Cursor";
import { gsap, ScrollTrigger, initReveals, refreshOnImages, prefersReducedMotion } from "../../lib/motion";
import { startSmoothScroll, stopSmoothScroll, scrollToTop, getLenis } from "../../lib/smooth";

/** Runs the shared reveal system for the current page and plays a short entrance. */
function PageTransition({ children }) {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useGSAP(
    () => {
      initReveals(ref.current);
      if (!prefersReducedMotion()) {
        gsap.fromTo(ref.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "transform" });
      }
    },
    { scope: ref, dependencies: [pathname] }
  );

  useEffect(() => refreshOnImages(ref.current), [pathname]);

  return (
    <div ref={ref} className="page">
      {children}
    </div>
  );
}

function PageFallback() {
  return <div className="page-fallback" aria-hidden="true" />;
}

export default function Layout() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) document.documentElement.classList.add("motion-ok");
  }, []);

  useEffect(() => {
    startSmoothScroll();
    return () => stopSmoothScroll();
  }, []);

  // New route: start at the top (or at the requested anchor), then re-measure triggers.
  useLayoutEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (!el) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, { offset: -88 });
        else el.scrollIntoView();
      });
    } else {
      scrollToTop();
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LoadingScreen />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <Cursor />
    </>
  );
}
