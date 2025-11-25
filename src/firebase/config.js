import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue } from "firebase/database";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDsSAwRs21K3tw3u8fLH8DeogoL-2sbw4A",
    authDomain: "hygienebites-9cb47.firebaseapp.com",
    databaseURL: "https://hygienebites-9cb47-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hygienebites-9cb47",
    storageBucket: "hygienebites-9cb47.appspot.com",
    messagingSenderId: "191732106096",
    appId: "1:191732106096:web:6026052a4eb6879bbb05b5"
};

const Firebase = initializeApp(firebaseConfig);
const database = getDatabase(Firebase);
const auth = getAuth(Firebase);


export { Firebase, auth, database };