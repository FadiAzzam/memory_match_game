import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const TimeCounter = ({ timeLeft, totalTime }) => {
  const controls = useAnimation();

  const percentage = (timeLeft / totalTime) * 100;

  // Set up animation properties
  const barVariants = {
    start: { width: `${percentage}%` },
    end: { width: "0%" },
  };

  // Trigger animation setup on component mount and when timeLeft changes
  useEffect(() => {
    controls.start({ width: `${percentage}%` });

    // Clear the animation when the component unmounts or when timeLeft is 0
    return () => controls.stop();
  }, [controls, percentage]);

  return (
    <div className="flex flex-col gap-1 my-3 w-full md:w-1/2 items-center justify-center">
      <span>{timeLeft}</span>
      <motion.div className="border border-green-400 w-full h-6 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-green-400 ${
            percentage < 50 && percentage >= 20
              ? "bg-yellow-400"
              : percentage < 20
              ? "bg-red-400"
              : percentage <= 10
              ? "bg-red-600"
              : ""
          }          `}
          animate={controls}
          variants={barVariants}
          transition={{ duration: timeLeft }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default TimeCounter;
