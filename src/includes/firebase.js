import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  addDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGNeRGOsy3jTvEezGTQBv1G21w1QZ2oi0",
  authDomain: "music-a87aa.firebaseapp.com",
  projectId: "music-a87aa",
  storageBucket: "music-a87aa.appspot.com",
  messagingSenderId: "99388918538",
  appId: "1:99388918538:web:3bbf011e62d5c17f0b88f3",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const usersCollection = collection(db, "users");
const songsCollection = collection(db, "songs");
const storage = getStorage(appFirebase);

export {
  auth,
  usersCollection,
  firebase,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateProfile,
  signOut,
  storage,
  ref,
  uploadBytesResumable,
  songsCollection,
  getDownloadURL,
  where,
  query,
  deleteObject,
};
