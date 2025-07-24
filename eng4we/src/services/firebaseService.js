// src/services/firebaseService.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // note: import Firestore instance from services/firebase.js

export async function getUserRole(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data().role || "user";
  } else {
    return "user";
  }
}
