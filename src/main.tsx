import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import AppV2 from "./app/AppV2.tsx";
import "./styles/index.css";

const path = window.location.pathname;

createRoot(document.getElementById("root")!).render(
  path === "/v2" ? <AppV2 /> : <App />
);