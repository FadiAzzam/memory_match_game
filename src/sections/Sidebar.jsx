import React, { useContext } from "react";
import { AppContext } from "../context/UserContext";

const Sidebar = () => {
  const context = useContext(AppContext);

  return (
    <>
      <h1>Players: </h1>
      <div className="flex flex-col gap-1">
        {context.store.firebaseUsers.map((user, i) => {
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
