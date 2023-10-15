import { projectFirestore } from "../firebase/config";
import uuid from "react-uuid";
import toast from "react-hot-toast";

export const getHighestScoreUser = async () => {
  const collectionRef = projectFirestore.collection("results");

  try {
    // Order documents by score in descending order and limit to one document
    const highestScoreUser = await collectionRef
      .orderBy("score")
      .limit(1)
      .get();

    if (highestScoreUser.docs.length > 0) {
      const userWithHighestScore = highestScoreUser.docs[0].data();
      return userWithHighestScore;
    }

    return null; // No user found in the database
  } catch (error) {
    console.error("Error getting highest score user:", error);
    throw error; // You can handle the error as needed
  }
};

export const addResultToFirestore = async (username, score) => {
  const collectionRef = projectFirestore.collection("results");

  const existingUser = await collectionRef
    .where("username", "==", username)
    .get();

  if (existingUser.docs.length > 0) {
    console.log("User already exists in the database");
  } else {
    collectionRef.add({
      id: uuid(),
      username: username,
      score: score,
    });
  }
};

export const checkUserInFirestore = async (username) => {
  const collectionRef = projectFirestore.collection("results");

  try {
    // Check if the user already exists
    const existingUser = await collectionRef
      .where("username", "==", username)
      .get();

    if (existingUser.docs.length > 0) {
      toast.error("User already exists in the database", {
        duration: 2000,
        position: "bottom-center",
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking user in Firestore:", error);
    return false;
  }
};
