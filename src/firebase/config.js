// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRpk9LVxARhDO14Ebtp8vaNV0FHdIuCn0",
  authDomain: "memorymatchgame-de41a.firebaseapp.com",
  projectId: "memorymatchgame-de41a",
  storageBucket: "memorymatchgame-de41a.appspot.com",
  messagingSenderId: "1093029505551",
  appId: "1:1093029505551:web:828877699bb73cab9f117a",
  measurementId: "G-H0MY9NKXPS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
