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
const Refunds = lazy(() => import("./pages/RefundsAndCancellation"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },

    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
