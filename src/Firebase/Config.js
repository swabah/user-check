import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBmu1EEh-_0LZbendi7NFEKlQIyBY0qE2Y",
  authDomain: "fir-course-af3e9.firebaseapp.com",
  projectId: "fir-course-af3e9",
  storageBucket: "fir-course-af3e9.appspot.com",
  messagingSenderId: "1008716480094",
  appId: "1:1008716480094:web:6b2542a988e435b86a7ecf",
  measurementId: "G-GEYJ65XD5Z"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)