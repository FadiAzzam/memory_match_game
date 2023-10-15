import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const UseFireStore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const collectionRef = projectFirestore.collection(collection);

    // Set up the snapshot listener
    const unsubscribe = collectionRef.onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });

      setDocs(documents);
    });

    // Clean up by unsubscribing the listener when the component unmounts
    return () => unsubscribe();
  }, [collection]);

  return { docs };
};

export default UseFireStore;
