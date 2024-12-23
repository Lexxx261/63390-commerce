// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ2c4Tgn9HCCBeFM5IH8lL9D8Nepi_E0A",
  authDomain: "commerce-ed25d.firebaseapp.com",
  projectId: "commerce-ed25d",
  storageBucket: "commerce-ed25d.firebasestorage.app",
  messagingSenderId: "23915787978",
  appId: "1:23915787978:web:022bf8e2af2ab020822633"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
