import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import NoMatch from "./layout/NoMatch";
import Header from "./layout/Header";
import Game from "./Pages/Game";

import LandingPage from "./Pages/LandingPage";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/game"
          element={
            <div className="mainContainer">
              <Header />
              <Game />
            </div>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
