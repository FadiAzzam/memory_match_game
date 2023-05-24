import React, { useEffect } from "react";

export default function Modal({ won, func, children }) {
  const [showModal, setShowModal] = React.useState(won);
  return (
    <>
      {won ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Your Score</h3>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => func()}
                  >
                    Close
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40  backdrop-blur drop-shadow-2xl bg-gray-700/20"></div>
        </>
      ) : null}
    </>
  );
}
