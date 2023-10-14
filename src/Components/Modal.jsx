import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Modal({ won, func, children }) {
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
                  to="/"
                  className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Close
                </Link>
              </div>
              {children}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
