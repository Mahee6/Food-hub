// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import this
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArM6lpvy7bi1Fh3pj6rZBfLT6SBeiSUp0",
  authDomain: "deliveryappmj.firebaseapp.com",
  projectId: "deliveryappmj",
  storageBucket: "deliveryappmj.firebasestorage.app",
  messagingSenderId: "894213533817",
  appId: "1:894213533817:web:85f55bceb11c2e41cde4a8",
  measurementId: "G-F0ZDYVCD3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Proper way to initialize Auth in modular Firebase
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app); // Firestore instance
