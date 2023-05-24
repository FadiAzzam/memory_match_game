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
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="fixed top-0 left-0 w-full h-screen"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          fill="#9b5de5"
          className="animate-outTop origin-[13px_25px]"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#f15bb5"
          className="animate-inTop origin-[13px_25px]"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#00bbf9"
          className="animate-outBottom origin-[84px_93px]"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#00f5d4"
          className="animate-inBottom origin-[84px_93px]"
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
      </svg>

      <div className="h-screen relative flex flex-col justify-center items-center text-center backdrop-blur-xl drop-shadow-2xl bg-gray-700/20">
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
