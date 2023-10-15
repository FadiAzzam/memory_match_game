import React, { useContext } from "react";
import { MdOutlineMemory } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";

import { AppContext } from "../context/UserContext";

const Header = () => {
  const context = useContext(AppContext);

  return (
    <header className="py-9">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-white dark:bg-blue-900/10 rounded-full shadow-xl dark:text-white">
        <div className="flex items-center justify-center gap-3 self-center text-2xl font-semibold whitespace-nowrap ">
          <MdOutlineMemory />
          <a href="/">Memory Game</a>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h5 className="text-2xl">600</h5>
          <IoDiamond className="text-orange-300" />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h5 className="text-2xl">{context.store.currentUser}</h5>
          <FaUserAstronaut />
        </div>
      </div>
    </header>
  );
};

export default Header;
