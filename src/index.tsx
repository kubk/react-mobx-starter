import { createRoot } from "react-dom/client";
import "./css/index.css";
import { Main } from "./components/main/main";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(<Main />);
