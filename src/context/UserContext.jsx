import React, { useState, useEffect } from "react";
import UseFireStore from "../hooks/UseFireStore";

export const AppContext = React.createContext(null);

export const ContextWrapper = (props) => {
  const { docs: firebaseUsers } = UseFireStore("results"); // Users from Firebase

  const [store, setStore] = useState({
    currentUser: "",
    firebaseUsers: firebaseUsers,
    users: [],
  });

  useEffect(() => {
    // Update users when Firebase data is available
    setStore((prevStore) => ({ ...prevStore, firebaseUsers }));
  }, [firebaseUsers]);

  const [actions, setActions] = useState({
    addUser: (name) => setStore({ ...store, users: store.users.concat(name) }),
    addCurrentUser: (name) => setStore({ ...store, currentUser: name }),
    setUsers: (users) => setStore({ ...store, users }),
  });

  return (
    <AppContext.Provider value={{ store, actions }}>
      {props.children}
    </AppContext.Provider>
  );
};
