// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA-OEP8v-gHrrX88z8OrlH7aiaizVcXK8",
  authDomain: "job-portal-demo-17ad7.firebaseapp.com",
  projectId: "job-portal-demo-17ad7",
  storageBucket: "job-portal-demo-17ad7.firebasestorage.app",
  messagingSenderId: "518535396793",
  appId: "1:518535396793:web:45004acf73586550938a68",
  measurementId: "G-GK1V4LV4RY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;