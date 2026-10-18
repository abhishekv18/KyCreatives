import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

// Home ships in the main bundle (it is the usual entry); other routes load on demand.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const D2C = lazy(() => import("./pages/services/D2C"));
const WebAppsWebsites = lazy(() => import("./pages/services/WebAppsWebsites"));
const MobileApps = lazy(() => import("./pages/services/MobileApps"));
const Portals = lazy(() => import("./pages/services/Portals"));
const Marketing = lazy(() => import("./pages/services/Marketing"));
const DesignGraphics = lazy(() => import("./pages/services/DesignGraphics"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/TermsAndConditions"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/about", element: <About /> },
      // { path: "/contact", element: <Contact /> },
      // { path: "/services/d2c", element: <D2C /> },
      // { path: "/services/web-apps-websites", element: <WebAppsWebsites /> },
      // { path: "/services/mobile-apps", element: <MobileApps /> },
      // { path: "/services/portals", element: <Portals /> },
      // { path: "/services/marketing", element: <Marketing /> },
      // { path: "/services/design-graphics", element: <DesignGraphics /> },
      // { path: "/privacy-policy", element: <PrivacyPolicy /> },
      // { path: "/terms-and-conditions", element: <Terms /> },
      // { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
