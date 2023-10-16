import React, { useEffect } from "react";
import Card from "./Card";
import { AppContext } from "../context/UserContext";

const Cards = ({ cards, handleCardClick }) => {
  console.log(Math.round(cards.length / 3));

  return (
    <div
      className={`grid grid-cols-${Math.round(
        cards.length / 3
      )} gap-3 items-stretch`}
    >
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
