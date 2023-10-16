import React, { useEffect, useState } from "react";
import { getHighestScoreUser } from "../utils/helpers";

const HighestScoreUser = () => {
  const [highestScoreUser, setHighestScoreUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getHighestScoreUser();
        setHighestScoreUser(user);
      } catch (error) {
        console.error("Error fetching highest score user:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <article className="flex flex-col p-3 gap-3 border-zinc-900 border grid-area-article">
      <h1 className="text-center py-3 text-blue-400">Highest Score User</h1>
      {highestScoreUser ? (
        <article className="border p-2 border-zinc-900 hover:bg-blue-400 hover:text-gray-900 transition-all cursor-default flex gap-2">
          <h2>Username: {highestScoreUser.username}</h2>
          <p>Score: {highestScoreUser.score}</p>
        </article>
      ) : (
        <p>No user with the highest score found.</p>
      )}
    </article>
  );
};

export default HighestScoreUser;
