import React, { useState, useEffect } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";

import BgSvg from "./Components/BgSvg";
import Game from "./Pages/Game";
import LandingPage from "./Pages/LandingPage";

const initialData = [
  {
    id: 0,
    display: "?",
    content: "🍇",
    found: false,
  },
  {
    id: 1,
    display: "?",
    content: "🍅",
    found: false,
  },
  {
    id: 2,
    display: "?",
    content: "🍈",
    found: false,
  },
  {
    id: 3,
    display: "?",
    content: "🍋",
    found: false,
  },
  {
    id: 4,
    display: "?",
    content: "🍊",
    found: false,
  },
  {
    id: 5,
    display: "?",
    content: "🍉",
    found: false,
  },
  {
    id: 6,
    display: "?",
    content: "🍇",
    found: false,
  },
  {
    id: 7,
    display: "?",
    content: "🍅",
    found: false,
  },
  {
    id: 8,
    display: "?",
    content: "🍈",
    found: false,
  },
  {
    id: 9,
    display: "?",
    content: "🍋",
    found: false,
  },
  {
    id: 10,
    display: "?",
    content: "🍊",
    found: false,
  },
  {
    id: 11,
    display: "?",
    content: "🍉",
    found: false,
  },
];
function App() {
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="h-screen">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                playerName={playerName}
                setPlayerName={setPlayerName}
              />
            }
          />
          <Route
            path="/game"
            element={<Game initialData={initialData} playerName={playerName} />}
          />
        </Routes>
      </HashRouter>

      {/* <BgSvg /> */}
    </div>
  );
}

export default App;
