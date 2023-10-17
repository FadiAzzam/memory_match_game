import React, { useEffect, useState } from "react";
import Card from "./Card";
import { AppContext } from "../context/UserContext";

const Cards = ({ cards, handleCardClick }) => {
  const classes = `grid grid-${
    cards.length < 9 ? "2" : Math.round(cards.length / 3)
  } gap-3 items-stretch`;

  return (
    <div className="flex flex-wrap justify-center items-center max-w-2xl">
      {cards.map((card, index) => {
        return (
          <React.Fragment key={card.id}>
            <Card card={card} handleCardClick={() => handleCardClick(index)} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Cards;
