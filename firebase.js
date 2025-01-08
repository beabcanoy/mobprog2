// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGgo849iqG53sl7aFNlT-yx6JwvDGj3O8",
  authDomain: "hotel-booking-ac11b.firebaseapp.com",
  projectId: "hotel-booking-ac11b",
  storageBucket: "hotel-booking-ac11b.firebasestorage.app",
  messagingSenderId: "927956385809",
  appId: "1:927956385809:web:aa65b18390b22b8354b1b0",
  measurementId: "G-L9FV07PYFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;
const analytics = getAnalytics(app); 