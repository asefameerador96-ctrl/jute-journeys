import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// The build prerenders each route into static HTML (scripts/prerender.mjs). That
// markup exists for crawlers that do not execute JavaScript — Bing, WhatsApp,
// Facebook, LinkedIn, GPTBot — and it gives real visitors something painted while
// the bundle loads.
//
// We deliberately do NOT hydrate it. The page animates on scroll and on mount, so
// the snapshot is taken in a state React's first render cannot reproduce, which
// made hydration fail (React errors 418/423/425). Replacing the markup outright is
// correct and costs one extra render on a page that was fully client-rendered
// before this change anyway.
container.replaceChildren();
createRoot(container).render(<App />);
