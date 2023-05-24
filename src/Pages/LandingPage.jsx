import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ setPlayerName, playerName }) => {
  return (
    <div className="z-10 backdrop-blur-xl drop-shadow-2xl bg-gray-700/20 h-screen relative flex justify-center items-center flex-col">
      <div className="flex flex-col gap-3 text-3xl text-center">
        <h1 className=" text-gray-300 py-3">Memory Game</h1>

        <input
          className="p-3"
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        {playerName ? (
          <Link to="/game" className="uppercase px-1 bg-green-400 p-3 ">
            start
          </Link>
        ) : (
          <span className="uppercase px-1 bg-gray-400 p-3 transition-all delay-100">
            start
          </span>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
