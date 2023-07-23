// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOCm_xubcciNChthrpk69YfHZbudstXk0",
  authDomain: "connectprof-fe42b.firebaseapp.com",
  projectId: "connectprof-fe42b",
  storageBucket: "connectprof-fe42b.appspot.com",
  messagingSenderId: "848713338987",
  appId: "1:848713338987:web:a519175b11066441fe212e",
  measurementId: "G-F2JG3RD2C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore=getFirestore(app);
export const auth =getAuth(app);