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
        // Handle the error as needed
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl">Highest Score User</h2>
      {highestScoreUser ? (
        <div className="text-lg">
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
