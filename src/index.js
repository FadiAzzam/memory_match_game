import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ContextWrapper, AppProvider } from "./context/UserContext";

const AppContext = () => (
  <AppProvider>
    <App />
  </AppProvider>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppContext />);
