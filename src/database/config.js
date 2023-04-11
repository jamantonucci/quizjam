import { initializeApp } from "firebase/app";
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyADefsyrA0uYA7GrfDiNrD9wMZGRtbVSmw",
  authDomain: "quizjam-58e51.firebaseapp.com",
  projectId: "quizjam-58e51",
  storageBucket: "quizjam-58e51.appspot.com",
  messagingSenderId: "1014161207929",
  appId: "1:1014161207929:web:bca2b4f96795b9a832daa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);