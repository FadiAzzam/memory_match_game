import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

import Cards from "../Components/Cards";
import Modal from "../Components/Modal";
import TimeCounter from "../Components/TimeCounter";

import Sidebar from "../sections/Sidebar";
import HighestScroeUser from "../Components/HighestScoreUser";

import { handleGameExit } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

import { generateGameData, shuffleArray } from "../utils/helpers";

const initialTime = 30;
const Game = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [level, setLevel] = useState(context.store.level);
  const [score, setScore] = useState(context.store.score);
  const [cards, setCards] = useState(shuffleArray(generateGameData(level)));
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [allCardFound, setAllCardFound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameOver, setGameOver] = useState(false);

  // Check for user presence when the component mounts
  useEffect(() => {
    if (context.store.currentUser === "") {
      // If there's no username, navigate back to the start page
      navigate("/");
    }
  }, [context.store.currentUser, navigate]);

  //checking if all cards are found
  const areAllCardsFound = () => {
    return cards.every((element) => element.flipped);
  };

  //checking if the slected Cards are equal
  useEffect(() => {
    if (flippedCount === 2) {
      const [index1, index2] = flippedIndexes;
      const card1 = cards[index1];
      const card2 = cards[index2];

      if (card1.value === card2.value) {
        // Match found
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === index1 || index === index2
              ? { ...card, matched: true }
              : card
          )
        );
        setScore((prevScore) => prevScore + 20);
        context.dispatch({ type: "UPDATE_SCORE", payload: score });
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === index1 || index === index2
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }

      setFlippedCount(0);
      setFlippedIndexes([]);
    }
  }, [flippedCount, flippedIndexes, cards]);

  const handleCardClick = (index) => {
    if (flippedCount < 2 && !cards[index].flipped && !cards[index].matched) {
      setCards((prevCards) =>
        prevCards.map((card, i) =>
          i === index ? { ...card, flipped: true } : card
        )
      );
      setFlippedCount((prevCount) => prevCount + 1);
      setFlippedIndexes((prevIndexes) => [...prevIndexes, index]);
    }
  };

  useEffect(() => {
    let timer;

    if (timeLeft > 0 && !allCardFound && !gameOver) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !allCardFound) {
      // Handle game over logic here
      handleGameOver();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, allCardFound]);

  // When all cards has been found move to next level
  useEffect(() => {
    if (areAllCardsFound()) {
      setAllCardFound(true);
      goToNextLevel();
      setTimeLeft(initialTime);
    }
  }, [cards]);

  // Reset timer when the level changes
  useEffect(() => {
    setTimeLeft(initialTime); // Reset the timer for each level
  }, [context.store.level]);

  const goToNextLevel = () => {
    context.dispatch({ type: "UPDATE_LEVEL", payload: level + 1 });

    setLevel((prevLevel) => prevLevel + 1);
    setCards(shuffleArray(generateGameData(level + 1))); // Generate new game data for the next level
    setFlippedCount(0);
    setFlippedIndexes([]);
    setAllCardFound(false); // Reset the flag for the next level
  };

  const resetGame = () => {
    // Reset the game state for the current level
    //handleGameExit(context.store.currentUser, score);

    // Update the context with the reset score and current level
    context.dispatch({ type: "UPDATE_SCORE", payload: 0 });
    context.dispatch({ type: "UPDATE_LEVEL", payload: 1 });

    setCards(shuffleArray(generateGameData(level)));
    setFlippedCount(0);
    setFlippedIndexes([]);
    setScore(0);
    setAllCardFound(false); // Reset the flag for the current level
  };

  // Function to handle game over
  const handleGameOver = () => {
    toast.error("Time's up! You didn't complete the level in time.");
    setGameOver(true);
    handleGameExit(context.store.currentUser, score);
    //navigate("/");
  };

  return (
    <>
      <Sidebar />
      <main className="grid-area-main flex justify-center items-center flex-col">
        <TimeCounter timeLeft={timeLeft} totalTime={30} />
        <div className="flex-1 flex items-center justify-center flex-col">
          <Cards cards={cards} handleCardClick={handleCardClick} />
          <button
            className="uppercase px-1 bg-rose-600 p-3 text-black cursor-pointer hover:bg-rose-500 rounded-lg mt-6"
            onClick={resetGame}
          >
            Reset Game
          </button>

          <Modal
            state={gameOver}
            score={score}
            reset={resetGame}
            level={level}
          />
          <Toaster />
        </div>
      </main>
      <HighestScroeUser />
    </>
  );
};

export default Game;
