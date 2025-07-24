// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNXHRIKuYjHLFL9cDAyuIganPdD4SYA1E",
  authDomain: "eng4we-f7403.firebaseapp.com",
  projectId: "eng4we-f7403",
  storageBucket: "eng4we-f7403.appspot.com",
  messagingSenderId: "499209788249",
  appId: "1:499209788249:web:cac5a463a46a8704b58a48",
  measurementId: "G-Y2KZD8FG8B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const getUserRole = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data().role || "user";
  } else {
    return "user";
  }
};
