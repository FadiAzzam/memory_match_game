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
    <div className="flex flex-col p-3 gap-3 text-2xl border-gray-600 border">
      <h2 className="text-blue-400">Highest Score User</h2>
      {highestScoreUser ? (
        <div>
          <p>Username: {highestScoreUser.username}</p>
          <p>Score: {highestScoreUser.score}</p>
        </div>
      ) : (
        <p>No user with the highest score found.</p>
      )}
    </div>
  );
};

export default HighestScoreUser;
