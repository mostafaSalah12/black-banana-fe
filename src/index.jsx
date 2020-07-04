import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./App.css";
import { PuzzleProvider } from "./providers/PuzzleProvider";

ReactDOM.render(
  <React.StrictMode>
    <PuzzleProvider>
      <App />
    </PuzzleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
