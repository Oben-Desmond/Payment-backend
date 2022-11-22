"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
// const analytics = getAnalytics(app);
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
//# sourceMappingURL=index.js.map