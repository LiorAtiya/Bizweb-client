import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "facework-126c7.firebaseapp.com",
  projectId: "facework-126c7",
  storageBucket: "facework-126c7.appspot.com",
  messagingSenderId: "252974895251",
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: "G-G0FWMYVYNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;