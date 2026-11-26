import { lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { whenReady } from "./lib/motion";

// Home ships in the main bundle (it is the usual entry); other routes load on
// demand, and are fetched quietly in idle time once the first page is up, so
// opening any page later never waits on a download.
const pages = {
  About: () => import("./pages/About"),
  Contact: () => import("./pages/Contact"),
  Portfolio: () => import("./pages/Portfolio"),
  Apps: () => import("./pages/Apps"),
  Partners: () => import("./pages/Partners"),
  D2C: () => import("./pages/services/D2C"),
  WebAppsWebsites: () => import("./pages/services/WebAppsWebsites"),
  MobileApps: () => import("./pages/services/MobileApps"),
  Portals: () => import("./pages/services/Portals"),
  Marketing: () => import("./pages/services/Marketing"),
  DesignGraphics: () => import("./pages/services/DesignGraphics"),
  PrivacyPolicy: () => import("./pages/PrivacyPolicy"),
  Terms: () => import("./pages/TermsAndConditions"),
  Refunds: () => import("./pages/RefundsAndCancellation"),
  NotFound: () => import("./pages/NotFound"),
};
const About = lazy(pages.About);
const Contact = lazy(pages.Contact);
const Portfolio = lazy(pages.Portfolio);
const Apps = lazy(pages.Apps);
const Partners = lazy(pages.Partners);
const D2C = lazy(pages.D2C);
const WebAppsWebsites = lazy(pages.WebAppsWebsites);
const MobileApps = lazy(pages.MobileApps);
const Portals = lazy(pages.Portals);
const Marketing = lazy(pages.Marketing);
const DesignGraphics = lazy(pages.DesignGraphics);
const PrivacyPolicy = lazy(pages.PrivacyPolicy);
const Terms = lazy(pages.Terms);
const Refunds = lazy(pages.Refunds);
const NotFound = lazy(pages.NotFound);

function preloadPages() {
  const run = () => Object.values(pages).forEach((load) => load().catch(() => {}));
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 2500 });
  else setTimeout(run, 1200);
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/portfolio/apps", element: <Apps /> },
      { path: "/partners", element: <Partners /> },

      // services, at their new addresses
      { path: "/services/ecommerce-development", element: <D2C /> },
      { path: "/services/mobile-app-development", element: <MobileApps /> },
      { path: "/services/custom-software-development", element: <Portals /> },
      { path: "/services/website-development", element: <WebAppsWebsites /> },
      // earlier addresses keep working
      { path: "/services/d2c", element: <Navigate to="/services/ecommerce-development" replace /> },
      { path: "/services/mobile-apps", element: <Navigate to="/services/mobile-app-development" replace /> },
      { path: "/services/portals", element: <Navigate to="/services/custom-software-development" replace /> },
      { path: "/services/custom-software", element: <Navigate to="/services/custom-software-development" replace /> },
      { path: "/services/web-apps-websites", element: <Navigate to="/services/website-development" replace /> },
      { path: "/services/marketing", element: <Marketing /> },
      { path: "/services/design-graphics", element: <DesignGraphics /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-and-conditions", element: <Terms /> },
      { path: "/refunds-and-cancellation", element: <Refunds /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  useEffect(() => {
    whenReady().then(preloadPages);
  }, []);
  return <RouterProvider router={router} />;
}
