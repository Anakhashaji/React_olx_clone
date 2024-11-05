import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSe18lK3HJLwOLA1lirCg9EXcFazhmAPs",
  authDomain: "olx-clone-132d1.firebaseapp.com",
  projectId: "olx-clone-132d1",
  storageBucket: "olx-clone-132d1.appspot.com",  // Ensure the correct storage bucket URL
  messagingSenderId: "629215839360",
  appId: "1:629215839360:web:da7807608aaa8ca7dc9265",
  measurementId: "G-RJC28RQP87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
