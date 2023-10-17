import React, { useContext } from "react";
import { MdOutlineMemory } from "react-icons/md";
import { IoDiamond, IoShieldHalf } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";

import { AppContext } from "../context/UserContext";

const Header = () => {
  const context = useContext(AppContext);

  const navItems = [
    { id: 1, text: "Memory Game", icon: MdOutlineMemory },
    { id: 2, text: context.store.score, icon: IoDiamond },
    { id: 3, text: context.store.level, icon: IoShieldHalf },
    { id: 4, text: context.store.currentUser, icon: FaUserAstronaut },
  ];

  return (
    <header className="grid-area-header">
      <div className="max-w-2xl flex flex-wrap items-center justify-between mx-auto p-4 m-3 bg-white dark:bg-zinc-950  rounded-full shadow-xl dark:text-white">
        {navItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-1 justify-center"
            >
              <h5 className="text-base md:text-xl">{item.text}</h5>
              <item.icon className="text-blue-400 text-base md:text-xl" />
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
