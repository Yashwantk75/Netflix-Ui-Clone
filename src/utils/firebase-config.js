import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCE5XqnD0kh0D8QB4kGpGo7IzBTKor-aJs",
  authDomain: "netflix-clone-723c0.firebaseapp.com",
  projectId: "netflix-clone-723c0",
  storageBucket: "netflix-clone-723c0.appspot.com",
  messagingSenderId: "501200059835",
  appId: "1:501200059835:web:3e26eda36f57a0e6da189e",
  measurementId: "G-3TYCVEYW9P",
};

const app = initializeApp(firebaseConfig); //create an app with config taken from firebase project

export const firebaseauth = getAuth(app); // get authanticate function using app
