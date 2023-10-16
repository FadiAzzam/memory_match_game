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

    if (existingUser.docs.length === 1) {
      toast.error("User already exists in the database", {
        duration: 2000,
        position: "bottom-center",
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking user in Firestore:", error);
    return false;
  }
};

export const updateScoreInFirestore = async (username, newScore) => {
  const collectionRef = projectFirestore.collection("results");

  // Get the document reference for the user
  const userDoc = await collectionRef.where("username", "==", username).get();

  if (userDoc.docs.length > 0) {
    const docId = userDoc.docs[0].id;

    // Update the user's score
    await collectionRef.doc(docId).update({
      score: newScore,
    });
  }
};

export const handleGameExit = async (username, score) => {
  if (username !== "") {
    try {
      let isUserExists = await checkUserInFirestore(username);
      if (isUserExists) {
        // If the user exists, update their score
        await updateScoreInFirestore(username, score);
      } else {
        // If the user doesn't exist, add a new entry
        await addResultToFirestore(username, score);
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  }
};

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the elements at currentIndex and randomIndex
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const generateGameData = (level) => {
  const cardsPerLevel = level * 2; // Adjust based on your design
  const emojis = ["🍎", "🍌", "🍓", "🍕", "🍔", "🍟", "🍦", "🍩", "🍰", "🍫"];
  const cards = [];
  const secondSetOfCards = [];

  for (let i = 1; i <= cardsPerLevel; i++) {
    const emojiIndex = i % emojis.length;
    const id = uuid();
    cards.push({
      id,
      value: emojis[emojiIndex],
      flipped: false,
      matched: false,
    });
    // Assign a different ID for the second set of cards
    secondSetOfCards.push({
      id: uuid(),
      value: emojis[emojiIndex],
      flipped: false,
      matched: false,
    });
  }

  // Concatenate both sets of cards to create pairs
  return [...cards, ...secondSetOfCards];
};
