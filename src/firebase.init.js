// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import env from 'react-dotenv';

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.PRIVATE_apiKey,
    // authDomain: process.env.PRIVATE_authDomain,
    // projectId: process.env.PRIVATE_projectId,
    // storageBucket: process.env.PRIVATE_storageBucket,
    // messagingSenderId: process.env.PRIVATE_messagingSenderId,
    // appId: process.env.PRIVATE_appId,

    apiKey: "AIzaSyBhSqKHEM64yI_uG3SyTT6MiuIYys8wm9o",
    authDomain: "paint-house-e0a95.firebaseapp.com",
    projectId: "paint-house-e0a95",
    storageBucket: "paint-house-e0a95.appspot.com",
    messagingSenderId: "110529370705",
    appId: "1:110529370705:web:751504dc57ff818663b670"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;



    // apiKey: "AIzaSyBhSqKHEM64yI_uG3SyTT6MiuIYys8wm9o",
    // authDomain: "paint-house-e0a95.firebaseapp.com",
    // projectId: "paint-house-e0a95",
    // storageBucket: "paint-house-e0a95.appspot.com",
    // messagingSenderId: "110529370705",
    // appId: "1:110529370705:web:751504dc57ff818663b670"