// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJPzkNjQEed8jJYvXd9xWnk0KIQ0gKWMA",
    authDomain: "petexpree.firebaseapp.com",
    projectId: "petexpree",
    storageBucket: "petexpree.appspot.com",
    messagingSenderId: "683798046730",
    appId: "1:683798046730:web:22fbbd09ff8464946c17f3"
  };

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
