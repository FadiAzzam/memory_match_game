import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      className="uppercase p-3 bg-rose-600 text-white cursor-pointer hover:bg-rose-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
