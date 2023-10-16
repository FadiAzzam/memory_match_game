import React, { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Modal({ won, score, reset }) {
  return (
    <>
      {won ? (
        <>
          <div className="fixed inset-0 z-40  backdrop-blur drop-shadow-2xl bg-gray-700/20 justify-center items-center flex p-6">
            <div className="border-0 rounded-sm shadow-lg relative flex flex-col bg-gray-100">
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
              <div className="p-6 flex gap-3 py-3 justify-center flex-col md:flex-row">
                <div className="grow border-4 p-3 border-sky-900 text-sky-900 bg-sky-400 shadow-xl transition-all delay-150 ">
                  <h1 className="text-xl md:text-3xl  uppercase animate-wiggle ">
                    You won in {score} seconds!
                  </h1>
                </div>
                <button
                  className="text-xl md:text-2xl border-4 border-sky-900 text-sky-900 p-3 hover:bg-sky-400 transition-all delay-150"
                  onClick={() => reset()}
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
