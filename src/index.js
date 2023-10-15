import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ContextWrapper } from "./context/UserContext";

const AppContext = () => (
  <ContextWrapper>
    <App />
  </ContextWrapper>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppContext />);
