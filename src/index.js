/**
 * Application entry point for the Recursive File Explorer project.
 *
 * This file mounts the React component tree into the DOM. Create React App
 * injects the bundled script into public/index.html, which provides the
 * #root element that React takes over at runtime.
 *
 * StrictMode is enabled so React double-invokes certain lifecycle logic in
 * development, helping catch side effects and deprecated patterns early.
 */

import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
