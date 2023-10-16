import React from "react";
import { motion } from "framer-motion";

const Card = ({ card, handleCardClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      className={`${
        card.matched ? "bg-green-400" : "bg-blue-400"
      }  text-white p-3 rounded-sm shadow-sm cursor-pointer w-20 h-20 md:w-28 md:h-28 flex justify-center items-center`}
      onClick={handleCardClick}
    >
      {card.flipped || card.matched ? (
        <h1 className="text-3xl font-bold">{card.value}</h1>
      ) : (
        <h1 className="text-3xl font-bold">?</h1>
      )}
    </motion.div>
  );
};

export default Card;
