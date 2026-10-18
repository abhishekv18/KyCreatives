import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts are self-hosted (no third-party request), only the weights the brand uses.
import "@fontsource/libre-baskerville/400.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/jetbrains-mono/400.css";

import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/visuals.css";
import "./styles/chrome.css";
import "./styles/pages.css";
import "./styles/inner.css";
import "./styles/service-blocks.css";
import "./styles/services.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
