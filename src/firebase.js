import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEKHApceAs7qRYS4WZ8j9wA-DV5UWOqb8",
  authDomain: "resumeforge-e7827.firebaseapp.com",
  projectId: "resumeforge-e7827",
  storageBucket: "resumeforge-e7827.firebasestorage.app",
  messagingSenderId: "810890161430",
  appId: "1:810890161430:web:c64cc36288d1f0c3d8b437",
  databaseURL: "https://resumeforge-e7827-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Use Realtime Database since it is globally instant and matches the user's console setup
export const rtdb = getDatabase(app);
