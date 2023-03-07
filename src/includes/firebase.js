import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGNeRGOsy3jTvEezGTQBv1G21w1QZ2oi0",
  authDomain: "music-a87aa.firebaseapp.com",
  projectId: "music-a87aa",
  storageBucket: "music-a87aa.appspot.com",
  messagingSenderId: "99388918538",
  appId: "1:99388918538:web:3bbf011e62d5c17f0b88f3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };
