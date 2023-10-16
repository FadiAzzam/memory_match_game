import React from "react";
import UseFireStore from "../hooks/UseFireStore";

const Sidebar = () => {
  const { docs } = UseFireStore("results"); // Users from Firebase

  return (
    <>
      <h1 className="text-2xl text-center py-3 text-blue-400">Players</h1>
      <div className="flex flex-col gap-1">
        {docs.map((user, i) => {
          return (
            <p
              key={user.id}
              className="border p-2 border-gray-600 hover:bg-green-300 hover:text-gray-900 transition-all cursor-default flex gap-2"
            >
              <span className="text-blue-400">{i + 1}.</span>
              <span>
                {user.username}, score: {user.score}
              </span>
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
