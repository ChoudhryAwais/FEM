// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyjC1e0r2RwsDvCnrjI0KY-OqOReZyjwo",
  authDomain: "fem-portal-c2363.firebaseapp.com",
  projectId: "fem-portal-c2363",
  storageBucket: "fem-portal-c2363.appspot.com",
  messagingSenderId: "622673162553",
  appId: "1:622673162553:web:91d96fc712e1d89fb978e8",
  measurementId: "G-C27PZ5LXB1"
};
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };