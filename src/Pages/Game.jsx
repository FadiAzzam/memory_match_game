import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/UserContext";

import Card from "../Components/Card";
import Modal from "../Components/Modal";
import { projectFirestore } from "../firebase/config";

import Sidebar from "../sections/Sidebar";
import HighestScroeUser from "../Components/HighestScoreUser";

import { addResultToFirestore } from "../utils/helpers";

const Game = ({ initialData }) => {
  const context = useContext(AppContext);

  const [data, setData] = useState(initialData);
  const [select, setSelect] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [compareState, setCompareState] = useState([]);

  const hasUserWon = () => {
    return data.every((element) => element.found);
  };

  useEffect(() => {
    const userWon = hasUserWon();
    setWon(userWon);
  }, [data]);

  useEffect(() => {
    if (!startTime) return;

    if (won) {
      const endTime = new Date();
      const elapsedTime = Math.floor((endTime - startTime) / 1000); // Calculate time in seconds
      setScore(elapsedTime);
    }
  }, [startTime, won]);

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

  const reset = () => {
    if (context.store.currentUser !== "") {
      addResultToFirestore(context.store.currentUser, score);
    }
    setData(initialData);
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
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 items-stretch">
            {data.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <Card
                    item={item}
                    select={select}
                    setFunc={setSelect}
                    timeLeft={timeLeft}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <HighestScroeUser />

          <Modal won={won}>
            <div className="p-6 flex gap-3 py-3 justify-center flex-col md:flex-row">
              <div className="grow border-4 p-3 border-sky-900 text-sky-900 bg-sky-400 shadow-xl transition-all delay-150 ">
                <h1 className="text-xl md:text-3xl  uppercase animate-wiggle ">
                  You won in {score} seconds!
                </h1>
              </div>
              <button
                className="text-xl md:text-2xl border-4 border-sky-900 text-sky-900 p-3 hover:bg-sky-400 transition-all delay-150"
                onClick={() => reset()}
              >
                Restart
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Game;
