import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Modal from "../Components/Modal";
import { projectFirestore } from "../firebase/config";
import useFireStore from "../hooks/useFireStore";

import Sidebar from "../sections/Sidebar";

const Game = ({ initialData, playerName }) => {
  const { docs } = useFireStore("results");
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

  const highestScoreObject = docs.reduce((acc, obj) => {
    if (!acc || obj.score < acc.score) {
      return obj;
    }
    return acc;
  }, null);

  const reset = () => {
    if (playerName !== "") {
      const collectionRef = projectFirestore.collection("results");
      collectionRef.add({ username: playerName, score: score });
      console.log(highestScoreObject);
    }
    setData(initialData);
    setWon(false);
    setScore(0);
    setStartTime(null);
  };

  return (
    <div className="mainContainer">
      <div className="grid-area-sidebar bg-gray-800 text-gray-100 p-3">
        <Sidebar docs={docs} />
      </div>
      <div className="grid-area-main flex justify-center items-center">
        <div className="">
          <h1 className="text-3xl text-gray-300 py-3">Memory Game</h1>
          <h1 className="text-3xl text-gray-300 py-3">Player: {playerName}</h1>
          <h1 className="text-3xl text-gray-300 py-3">
            Best score: {playerName}
          </h1>

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

          <Modal won={won} func={reset}>
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
