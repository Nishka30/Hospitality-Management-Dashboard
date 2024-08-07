// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import the necessary auth functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBUwKYaHDgBM_eDrBtV1FIBcW_21203hI",
  authDomain: "hospitality-management-e5804.firebaseapp.com",
  projectId: "hospitality-management-e5804",
  storageBucket: "hospitality-management-e5804.appspot.com",
  messagingSenderId: "574803062224",
  appId: "1:574803062224:web:92ce82493c2e4278725dd5",
  measurementId: "G-JMK537B1H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the auth instance

// Export the auth instance and auth functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
