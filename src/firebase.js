// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC194-2IX51ZSWGT9g0yL0XyCeNxE64gDg",
  authDomain: "fire-crude-8efa2.firebaseapp.com",
  projectId: "fire-crude-8efa2",
  storageBucket: "fire-crude-8efa2.appspot.com",
  messagingSenderId: "562556906010",
  appId: "1:562556906010:web:2f01da3c4b13f92891bfa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth,db };