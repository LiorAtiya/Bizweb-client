// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLHNcju4OcazNcFBha9Ba_MFiuYhXYNZM",
  authDomain: "facework-126c7.firebaseapp.com",
  projectId: "facework-126c7",
  storageBucket: "facework-126c7.appspot.com",
  messagingSenderId: "252974895251",
  appId: "1:252974895251:web:619467150e2d2dfbb47d66",
  measurementId: "G-G0FWMYVYNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;