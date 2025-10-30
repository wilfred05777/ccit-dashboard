/* eslint-disable @typescript-eslint/no-unused-vars */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBVLKBt-kn-vn3pti_7rpwOYuPO_9E3_W0",
  authDomain: "ccit-dashboard.firebaseapp.com",
  projectId: "ccit-dashboard",
  storageBucket: "ccit-dashboard.firebasestorage.app",
  messagingSenderId: "597771975739",
  appId: "1:597771975739:web:386ea6eb2c84ba0c02f01e",
  measurementId: "G-4W9B475YKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
