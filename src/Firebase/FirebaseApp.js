// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt0QfrSOoYlkweexQp6OFcZavOokI4uho",
  authDomain: "fem-ee4bc.firebaseapp.com",
  projectId: "fem-ee4bc",
  storageBucket: "fem-ee4bc.appspot.com",
  messagingSenderId: "406420173826",
  appId: "1:406420173826:web:6c869294db3a1f6298a31b",
  measurementId: "G-73TNMS1TZ4"
};
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };