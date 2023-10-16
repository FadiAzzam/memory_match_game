import React, { useState, useEffect, useReducer, createContext } from "react";
import UseFireStore from "../hooks/UseFireStore";

const initialState = {
  currentUser: "",
  level: 1,
  score: 0,
};

export const AppContext = createContext(null);

const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_LEVEL":
      return { ...state, level: action.payload };
    case "UPDATE_SCORE":
      return { ...state, score: action.payload };
    case "ADD_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    // Add any other cases as needed
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// export const ContextWrapper = (props) => {
//   const { docs: firebaseUsers } = UseFireStore("results"); // Users from Firebase

//   const [store, setStore] = useState({
//     currentUser: "",
//     score: 0,
//     level: 1,
//   });

//   useEffect(() => {
//     // Update users when Firebase data is available
//     setStore((prevStore) => ({ ...prevStore, firebaseUsers }));
//   }, [firebaseUsers]);

//   const [actions, setActions] = useState({
//     addUser: (name) => setStore({ ...store, users: store.users.concat(name) }),
//     addCurrentUser: (name) => setStore({ ...store, currentUser: name }),
//     setUsers: (users) => setStore({ ...store, users }),
//     setScore: (score) => setStore({ ...store, score: score }),
//     setLevel: (level) => setStore({ ...store, level: level }),
//   });

//   return (
//     <AppContext.Provider value={{ store, actions }}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };
