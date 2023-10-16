import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

import Cards from "../Components/Cards";
import Modal from "../Components/Modal";

import Sidebar from "../sections/Sidebar";
import HighestScroeUser from "../Components/HighestScoreUser";

import { handleGameExit } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

import { generateGameData, shuffleArray } from "../utils/helpers";

const Game = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [level, setLevel] = useState(1);
  const [data, setData] = useState(shuffleArray(generateGameData(level)));
  const [select, setSelect] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [compareState, setCompareState] = useState([]);

  // Check for user presence when the component mounts
  useEffect(() => {
    if (context.store.currentUser === "") {
      // If there's no username, navigate back to the start page
      navigate("/");
    }
  }, [context.store.currentUser, navigate]);

  // checking if all cards are found
  const areAllCardsFound = () => {
    return data.every((element) => element.found);
  };

  useEffect(() => {
    const userWon = areAllCardsFound();
    setLevel((prevLevel) => prevLevel + 1);
    //setWon(userWon);
  }, [data]);

  useEffect(() => {
    if (!startTime) return;

    if (won) {
      const endTime = new Date();
      const elapsedTime = Math.floor((endTime - startTime) / 1000); // Calculate time in seconds
      setScore(elapsedTime);
    }
  }, [startTime, won, level]);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (select.length !== 0) {
      setTimeLeft(2);
      if (!startTime) {
        setStartTime(new Date());
      }
    }
    setCompareState((prevState) => prevState.concat(select));
  }, [select]);

  useEffect(() => {
    compareObjects();
  }, [compareState]);

  const compareObjects = () => {
    if (compareState.length === 2) {
      if (compareState[0].content === compareState[1].content) {
        const updatedData = data.map((item) =>
          item.content === compareState[1].content
            ? { ...item, found: true }
            : item
        );
        setData(updatedData);
        setCompareState([]);
      } else {
        setCompareState([]);
      }
    }
  };

  const reset = async () => {
    handleGameExit(context.store.currentUser, score);
    setData(shuffleArray(generateGameData(level)));
    setWon(false);
    setScore(0);
    setStartTime(null);
  };

  return (
    <div className="mainContainer">
      <div className="grid-area-sidebar  text-gray-100 p-3">
        <Sidebar />
      </div>
      <div className="grid-area-main flex justify-center items-center">
        <div>
          {score}
          <Cards
            data={data}
            select={select}
            setSelect={setSelect}
            timeLeft={timeLeft}
          />
          <HighestScroeUser />

          <Modal won={won} score={score} reset={reset} />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Game;
