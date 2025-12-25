// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMnT1bfcheZPqsNWYUpz76b9eZwnymY9M",
  authDomain: "evalyai-8c8cc.firebaseapp.com",
  projectId: "evalyai-8c8cc",
  storageBucket: "evalyai-8c8cc.firebasestorage.app",
  messagingSenderId: "10247490974",
  appId: "1:10247490974:web:8cc775946544112f199a8f",
  measurementId: "G-7XECHV7X3G"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);