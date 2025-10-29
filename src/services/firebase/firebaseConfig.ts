// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv9Zp_wDkaC1eT_0FVtBZfaGUWkKhCOyw",
  authDomain: "mathi-racer.firebaseapp.com",
  projectId: "mathi-racer",
  storageBucket: "mathi-racer.firebasestorage.app",
  messagingSenderId: "809019274165",
  appId: "1:809019274165:web:e6bc9fdb122c4fc0709ffc",
  measurementId: "G-MFYLQTRSS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
