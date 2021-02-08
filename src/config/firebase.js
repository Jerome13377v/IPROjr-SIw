

import firebase from "firebase/app";
import 'firebase/storage';
import "firebase/auth";
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5tmpVHFUIDW7nq87eJv57BgKW54G5iwI",
  authDomain: "ipro-database.firebaseapp.com",
  projectId: "ipro-database",
  storageBucket: "ipro-database.appspot.com",
  messagingSenderId: "649052552256",
  appId: "1:649052552256:web:30aae1b3568760fd74b3a5",
  measurementId: "G-VLVDDEQTWL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;