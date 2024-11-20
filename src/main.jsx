import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

// Import PWA service worker registration
import { registerSW } from "virtual:pwa-register";

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content is available. Refresh?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline!");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light", // or 'dark'
          }}
        >
          <App />
        </MantineProvider>
      </Router>
    </AuthProvider>
  </StrictMode>
);
