import React, { useContext } from "react";
import { MdOutlineMemory } from "react-icons/md";
import { IoDiamond, IoShieldHalf } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";

import { AppContext } from "../context/UserContext";

const Header = () => {
  const context = useContext(AppContext);

  return (
    <header className="grid-area-header">
      <div className="max-w-2xl flex flex-wrap items-center justify-between mx-auto p-4 m-3 bg-white dark:bg-zinc-950  rounded-full shadow-xl dark:text-white">
        <div className="flex items-center justify-center gap-2 self-center text-2xl font-semibold whitespace-nowrap ">
          <MdOutlineMemory className="text-blue-400 text-2xl" />
          <a href="/" className="text-xl">
            Memory Game
          </a>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h5 className="text-xl">{context.store.score}</h5>
          <IoDiamond className="text-blue-400 text-xl" />
        </div>
        <div className="flex items-center gap-2 justify-center ">
          <h5 className="text-xl">{context.store.level}</h5>
          <IoShieldHalf className="text-blue-400 text-xl" />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h5 className="text-xl">{context.store.currentUser}</h5>
          <FaUserAstronaut className="text-blue-400 text-xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
