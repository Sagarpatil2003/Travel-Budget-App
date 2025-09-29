// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcZnoBLrbRpcqTgRzWOSWtyWYa7Um9vXo",
  authDomain: "travel-budget-app-3da0c.firebaseapp.com",
  projectId: "travel-budget-app-3da0c",
  storageBucket: "travel-budget-app-3da0c.firebasestorage.app",
  messagingSenderId: "438913834357",
  appId: "1:438913834357:web:b7006c505086bc0796473c",
  measurementId: "G-Q8LPKBY26T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <--- This line is critical!