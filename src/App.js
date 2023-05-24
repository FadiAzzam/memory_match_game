import React, { useState, useEffect } from "react";
import Card from "./Components/Card";
import Modal from "./Components/Modal";
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
    setData(initialData);
    setWon(false);
    setScore(0);
    setStartTime(null);
  };

  return (
    <div className="h-screen relative flex justify-center items-center text-center">
      {/* {timeLeft !== 0 && (
        <h1 className="text-xl py-6 absolute top-0 left-0 right-0 bg-red-400/50 text-white animate-bounce">
          {timeLeft}
        </h1>
      )} */}
      <div className="">
        <h1 className="text-3xl text-gray-300 py-3">Memory Game</h1>
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
          <div className="relative p-6 flex-auto">
            <div className="flex gap-3 py-3 justify-center">
              <div className="grow border-4 p-3 border-sky-900 text-sky-900 bg-sky-400 shadow-xl transition-all delay-150 ">
                <h1 className="text-3xl uppercase animate-wiggle ">
                  You won in {score} seconds!
                </h1>
              </div>
              <button
                className="text-2xl border-4 border-sky-900 text-sky-900 p-3 hover:bg-sky-400 transition-all delay-150"
                onClick={() => reset()}
              >
                Restart
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
