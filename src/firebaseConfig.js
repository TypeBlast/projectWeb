// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm-78a0Fr1_6jkQUH4Tu3Z05XhzBRGaW0",
  authDomain: "petexpress2024-4863a.firebaseapp.com",
  projectId: "petexpress2024-4863a",
  storageBucket: "petexpress2024-4863a.appspot.com",
  messagingSenderId: "185229288899",
  appId: "1:185229288899:web:e96820c46587b6248d0976"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
