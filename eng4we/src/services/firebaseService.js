// src/services/firebaseService.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // your Firestore instance

export async function getUserRole(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.role ? data.role.trim().toLowerCase() : null;
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}
