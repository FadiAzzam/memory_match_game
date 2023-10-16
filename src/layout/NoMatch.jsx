import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NoMatch = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-zinc-700 p-3 w-1/2 h-1/4 flex justify-center items-center flex-col gap-3">
        <h1 className="text-6xl text-red-400">Page not found</h1>
        <h3 className="text-2xl">No match for {location.pathname}</h3>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NoMatch;
