// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBgFBcvMgKB56qOFRDgzemQkC0ycTCMIw",
  authDomain: "react-ozflix.firebaseapp.com",
  // databaseURL: "https://react-ozflix-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-ozflix",
  storageBucket: "react-ozflix.appspot.com",
  messagingSenderId: "1023397377738",
  appId: "1:1023397377738:web:52f90ce199901197e06633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export default app;