import { initializeApp } from "firebase/app";

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