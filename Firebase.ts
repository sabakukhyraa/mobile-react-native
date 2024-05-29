import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6ZZyxJeYgaK51Sc_4fxI7GdOSEQSwYjY",
  authDomain: "reactnativetodo-50d1d.firebaseapp.com",
  projectId: "reactnativetodo-50d1d",
  storageBucket: "reactnativetodo-50d1d.appspot.com",
  messagingSenderId: "426114015411",
  appId: "1:426114015411:web:6c1cc4386f40b456a8d0c6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);