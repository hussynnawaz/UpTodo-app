// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYJsjF3drHze1aZPd5csXKmE0eY4LC6K4",
  authDomain: "uptodo-1539f.firebaseapp.com",
  projectId: "uptodo-1539f",
  storageBucket: "uptodo-1539f.firebasestorage.app",
  messagingSenderId: "1005750852618",
  appId: "1:1005750852618:web:72fa8a1b106c6274ecd3f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
