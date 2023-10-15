import React, { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ item, select, setFunc, timeLeft }) => {
  const isMatched =
    timeLeft > 0 &&
    item?.content === select[0]?.content &&
    item?.id === select[0]?.id;

  const isFound = item.found;

  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      className={`${
        item.found ? "bg-green-400" : "bg-blue-400"
      }  text-white p-3 rounded-sm shadow-sm cursor-pointer w-20 h-20 md:w-28 md:h-28 flex justify-center items-center`}
      onClick={() => {
        if (item.id === select[0]?.id) {
          return;
        } else {
          setFunc([{ id: item.id, content: item.content }]);
        }
      }}
    >
      {isMatched || isFound ? (
        <h1 className="text-3xl font-bold">{item.content}</h1>
      ) : (
        <h1 className="text-3xl font-bold">{item.display}</h1>
      )}
    </motion.div>
  );
};

export default Card;
