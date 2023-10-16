import React from "react";
import Card from "./Card";

const Cards = ({ data, select, setSelect, timeLeft }) => {
  return (
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
  );
};

export default Cards;
