// src/firebaseHelpers.js

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your Firebase config — replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBNXHRIKuYjHLFL9cDAyuIganPdD4SYA1E",
  authDomain: "eng4we-f7403.firebaseapp.com",
  projectId: "eng4we-f7403",
  storageBucket: "eng4we-f7403.appspot.com",
  messagingSenderId: "499209788249",
  appId: "1:499209788249:web:cac5a463a46a8704b58a48",
  measurementId: "G-Y2KZD8FG8B",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Subscribe to lessons collection with real-time updates.
 * @param {function} setLessons - React setState function to update lessons.
 * @returns unsubscribe function
 */
export const subscribeToLessons = (setLessons) => {
  const lessonsRef = collection(db, "lessons");
  return onSnapshot(lessonsRef, (snapshot) => {
    const lessons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLessons(lessons);
  });
};

/**
 * Subscribe to user's progress for all lessons with real-time updates.
 * @param {string} userId - Firebase user ID.
 * @param {function} setProgress - React setState function to update progress.
 * @returns unsubscribe function
 */
export const subscribeToUserProgress = (userId, setProgress) => {
  const progressRef = collection(db, "users", userId, "progress");
  return onSnapshot(progressRef, (snapshot) => {
    const progress = {};
    snapshot.docs.forEach((doc) => {
      progress[doc.id] = doc.data();
    });
    setProgress(progress);
  });
};

/**
 * Update progress for a specific lesson for a user.
 * @param {string} userId - Firebase user ID.
 * @param {string} lessonId - Lesson document ID.
 * @param {object} progressData - Progress data to update.
 * @returns {Promise<void>}
 */
export const updateProgress = async (userId, lessonId, progressData) => {
  const progressRef = doc(db, "users", userId, "progress", lessonId);
  await setDoc(progressRef, progressData, { merge: true });
  console.log(`Progress updated for lesson ${lessonId} of user ${userId}`);
};

export { auth, db };
