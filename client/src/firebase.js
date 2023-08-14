// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getStorage} from "firebase/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjL0VXoeJ4rV_Dobjz00Hz02S1rjOxB4k",
  authDomain: "npstorage.firebaseapp.com",
  projectId: "npstorage",
  storageBucket: "npstorage.appspot.com",
  messagingSenderId: "66768292705",
  appId: "1:66768292705:web:cd3509f41bb6cc57149320",
  measurementId: "G-XY5LNFNVLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)