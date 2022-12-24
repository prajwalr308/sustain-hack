// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCacjQDgLnds4mjywbPvKhhUAAW3u1j_p8",
  authDomain: "sustainhack-2b610.firebaseapp.com",
  projectId: "sustainhack-2b610",
  storageBucket: "sustainhack-2b610.appspot.com",
  messagingSenderId: "699053572641",
  appId: "1:699053572641:web:1a4bced8b1dd34a4101960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);