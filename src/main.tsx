import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
// import { initGA } from "./lib/analytics"; // TEMPORARILY DISABLED

// Initialize Google Analytics - TEMPORARILY DISABLED
// initGA();

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
