import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BusinessProvider } from "./context/BusinessContext";

ReactDOM.render(
  <BusinessProvider>
    <App />
  </BusinessProvider>,

  document.getElementById("root")
);
