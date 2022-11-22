// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDmL3HvzdMRZycuDe5GkXidgEN0WYpSUQQ",
    authDomain: "intmaltesepuppieshome.firebaseapp.com",
    databaseURL: "https://intmaltesepuppieshome.firebaseio.com",
    projectId: "intmaltesepuppieshome",
    storageBucket: "intmaltesepuppieshome.appspot.com",
    messagingSenderId: "105958917821",
    appId: "1:105958917821:web:af665834b20336a01599d4",
    measurementId: "G-SG54P87JGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    app,
    db,
}