import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { checkUserInFirestore } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/UserContext";

const LandingPage = () => {
  const context = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!context.store.currentUser) {
      toast.error("Please enter your name", {
        duration: 1000,
        position: "bottom-center",
      });
      return;
    }

    try {
      let isUserExists = await checkUserInFirestore(context.store.currentUser);

      if (isUserExists) {
        return;
      }

      navigate("/game");
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <div className="h-screen relative flex justify-center items-center flex-col">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 text-xl text-center"
        >
          <input
            className="p-3 text-black"
            type="text"
            placeholder="Enter your name"
            value={context.store.currentUser}
            onChange={(e) =>
              context.dispatch({
                type: "ADD_CURRENT_USER",
                payload: e.target.value,
              })
            }
            required
            minLength="3"
            maxLength="20"
          />
          <input
            type="submit"
            value="start"
            className="uppercase px-1 bg-rose-600 p-3 text-black cursor-pointer hover:bg-rose-500"
          />
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
