import React from "react";

const Sidebar = ({ docs }) => {
  return (
    <>
      <h1>Players: </h1>
      <div className="flex flex-col gap-1">
        {docs.map((user, i) => {
          return (
            <p className="border p-1 border-gray-600 hover:bg-green-300 hover:text-gray-900 transition-all cursor-default flex gap-2">
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
