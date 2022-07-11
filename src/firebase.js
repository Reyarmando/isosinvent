// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOLLF2Fec9CVqofHJiOTc6HJVYcCqij70",
  authDomain: "react-fb-7128c.firebaseapp.com",
  projectId: "react-fb-7128c",
  storageBucket: "react-fb-7128c.appspot.com",
  messagingSenderId: "583494773980",
  appId: "1:583494773980:web:7c68dee5b7afb838ee1819"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);