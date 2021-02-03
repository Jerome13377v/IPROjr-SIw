
import 'firebase/storage';

import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "==========",
  authDomain: "=========",
  projectId: "============",
  storageBucket: "==========================",
  messagingSenderId: "===============",
  appId: "1==============================",
  measurementId: "======================L"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default firebase;