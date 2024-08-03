// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2ACUxkYA08z_azMk8KwGLBCZSx21ly_Y",
  authDomain: "pantry-tracker-1b81c.firebaseapp.com",
  projectId: "pantry-tracker-1b81c",
  storageBucket: "pantry-tracker-1b81c.appspot.com",
  messagingSenderId: "469349140874",
  appId: "1:469349140874:web:fbd5e2207a851f8673e073",
  measurementId: "G-5TWRTXF2CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);