// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-property-seller.firebaseapp.com",
  projectId: "mern-property-seller",
  storageBucket: "mern-property-seller.appspot.com",
  messagingSenderId: "1056625136389",
  appId: "1:1056625136389:web:5bdffad21864bd87059d6c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
