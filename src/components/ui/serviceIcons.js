// One rounded line icon per service (Lucide, 1.5px stroke), shared by the
// navigation, mobile menu and service indexes.
import { ShoppingBag, AppWindow, Smartphone, LayoutDashboard, Megaphone, PenTool } from "lucide-react";

export const serviceIcons = {
  d2c: ShoppingBag,
  "web-apps-websites": AppWindow,
  "mobile-apps": Smartphone,
  portals: LayoutDashboard,
  marketing: Megaphone,
  "design-graphics": PenTool,
};

// The colour field each service uses wherever it is staged.
export const serviceStage = {
  d2c: "flame",
  "web-apps-websites": "ink",
  "mobile-apps": "violet",
  portals: "cobalt",
  marketing: "orange",
  "design-graphics": "cyan",
};
