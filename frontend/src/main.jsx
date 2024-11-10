import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <ShopProvider>
    {/* <StrictMode> */}
    <App />
    {/* </StrictMode> */}
  </ShopProvider>
);
