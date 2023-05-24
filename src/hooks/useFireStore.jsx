import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFireStore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const data = projectFirestore.collection("results").onSnapshot((snap) => {
      let docs = [];
      snap.forEach((e) => {
        docs.push({ ...e.data() });
      });
      setDocs(docs);
    });

    return () => data();
  }, [collection]);

  return { docs };
};

export default useFireStore;
