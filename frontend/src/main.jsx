import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Import your CSS file
import App from "./App.jsx"; // Main App component
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
