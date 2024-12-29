import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./scss/styles.scss"; // Import global styles

// Get the root element where the React application will be mounted
const rootElement = document.getElementById("root");

if (rootElement) {
  // Initialize the React application and render it inside the root element
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
