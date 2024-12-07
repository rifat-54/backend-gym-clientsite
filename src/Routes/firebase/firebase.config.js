// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA46JKySOYiIJdobUYYGazC6hDtOjhYVGw",
  authDomain: "gym-master-51062.firebaseapp.com",
  projectId: "gym-master-51062",
  storageBucket: "gym-master-51062.firebasestorage.app",
  messagingSenderId: "174010912836",
  appId: "1:174010912836:web:616361dbfbf522319eac11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);