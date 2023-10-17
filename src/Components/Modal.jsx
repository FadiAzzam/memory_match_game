import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/UserContext";

export default function Modal({ state, score, level, reset }) {
  const context = useContext(AppContext);

  return (
    <>
      {state ? (
        <>
          <div className="fixed inset-0 z-40  backdrop-blur drop-shadow-2xl bg-gray-700/20 justify-center items-center flex p-6">
            <div className="w-1/2 h-1/3 border-0 rounded-sm shadow-lg relative flex flex-col bg-gray-900">
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                <h3 className="text-lg md:text-3xl font-semibold">
                  Your Score
                </h3>
                <Link
                  onClick={() => {
                    reset();
                  }}
                  to="/"
                  className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Close
                </Link>
              </div>
              <div className="p-3 flex gap-3 py-3 justify-center items-center h-full flex-col ">
                <div className="border-4 p-3 border-sky-900 text-sky-900 bg-sky-400 shadow-xl transition-all delay-150 ">
                  <h1 className="text-xl md:text-3xl  uppercase  ">
                    Name {context.store.currentUser}
                  </h1>
                  <h1 className="text-xl md:text-3xl  uppercase  ">
                    Your Score is {score}
                  </h1>
                  <h1 className="text-xl md:text-3xl  uppercase ">
                    Your Level is {level}
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                <Link
                  onClick={() => {
                    reset();
                  }}
                  to="/"
                  className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Restart
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
