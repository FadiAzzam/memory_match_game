import React from "react";
import UseFireStore from "../hooks/UseFireStore";

const Sidebar = () => {
  const { docs } = UseFireStore("results"); // Users from Firebase

  return (
    <aside className="grid-area-sidebar hidden md:flex flex-col p-3 gap-3 border-zinc-900 border">
      <h1 className=" text-center py-3 text-blue-400">Players</h1>
      <div className="flex flex-col gap-1">
        {docs.map((user, i) => {
          return (
            <p
              key={user.id}
              className="border p-2 border-zinc-900 hover:bg-blue-700 hover:text-gray-900 transition-all cursor-default flex gap-2"
            >
              <span className="text-blue-400">{i + 1}.</span>
              <span className="break-words">
                {user.username}, score: {user.score}
              </span>
            </p>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
