
import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref as firebaseDatabaseRef,
    set as firebaseDatabaseSet  ,
    child,
    get,
    onValue,
    remove,
    
    
} from "firebase/database";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-O0LtfN20Xe42xqsqxQa_coHr86ChQog",
    authDomain: "shoppingapp-e2a34.firebaseapp.com",
    databaseURL: "https://shoppingapp-e2a34-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "shoppingapp-e2a34.appspot.com",
    appId: "1:360259996939:android:f7b7e652f57731b96aa60e",
    messagingSenderId: "360259996939",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();
export {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseDatabaseSet,
    sendEmailVerification,
    child,
    get,
    onValue,
    remove,
    signInWithEmailAndPassword //reload when online change
}