import PhoneFrame from "../ui/PhoneFrame";
import BrowserFrame from "../ui/BrowserFrame";
import { Arcs, Blueprint } from "../art/Art";
import { PhoneMock, PortalMock, CampaignMock, BrandSheet, DashboardMock, ConceptLabel } from "./Visuals";
import { shotSrc } from "../../data/projects";

/**
 * The staged visual for each service, used by the homepage service index.
 * Real client screens where they exist; labelled concepts otherwise.
 */
export default function ServiceVisual({ slug, compact = false }) {
  switch (slug) {
    case "d2c":
      return (
        <div className="sv sv--d2c">
          <PhoneFrame src="/images/work/m-thedecorshed.webp" alt="" />
          <PhoneFrame src="/images/work/m-vibhadesigns.webp" alt="" />
          <p className="sv__cap t-meta">Live client stores on a phone</p>
        </div>
      );
    case "web-apps-websites": {
      const s = shotSrc("pinkdinosaur", "wide");
      return (
        <div className="sv sv--web">
          <Blueprint />
          <div className="sv__site">
            <BrowserFrame domain="pinkdinosaur.co" {...s} sizes={compact ? "90vw" : "36vw"} alt="" ratio="16 / 10" />
          </div>
          <div className="sv__app">
            <DashboardMock />
          </div>
          <p className="sv__cap t-meta">Live client site, with a concept app screen</p>
        </div>
      );
    }
    case "mobile-apps":
      return (
        <div className="sv sv--mobile">
          <Arcs />
          <PhoneMock />
          <p className="sv__cap">
            <ConceptLabel tone="dark">Concept screen</ConceptLabel>
          </p>
        </div>
      );
    case "portals":
      return (
        <div className="sv sv--portals">
          <PortalMock />
          <p className="sv__cap">
            <ConceptLabel>Concept screen</ConceptLabel>
          </p>
        </div>
      );
    case "marketing":
      return (
        <div className="sv sv--marketing">
          <CampaignMock />
          <p className="sv__cap">
            <ConceptLabel>Concept plan</ConceptLabel>
          </p>
        </div>
      );
    default:
      return (
        <div className="sv sv--design">
          <BrandSheet />
          <p className="sv__cap t-meta">Our own identity system</p>
        </div>
      );
  }
}
