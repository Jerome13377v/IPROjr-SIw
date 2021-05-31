

import firebase from "firebase/app";
import 'firebase/storage';
import "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../API_KEY'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;