"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransactions = exports.createApplication = exports.verifyZitoPaymentSuccess = void 0;
const axios_1 = __importDefault(require("axios"));
const kcpayment_api_1 = require("./firebase/kcpayment.api");
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyA4jrRJRt1GsSls7A_0Kp8cuNCv1DuCWfg",
    authDomain: "transcript-assistant-app.firebaseapp.com",
    projectId: "transcript-assistant-app",
    storageBucket: "transcript-assistant-app.appspot.com",
    messagingSenderId: "449963740527",
    appId: "1:449963740527:web:6392525d22132fd91f6c9a",
    measurementId: "G-SF4WNHC6DN"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig, "transcript-app");
const db = (0, firestore_1.getFirestore)(app);
function verifyZitoPaymentSuccess(transcriptID) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (yield axios_1.default.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=democreator&ref=${transcriptID}`)).data;
        if (result.status == 1) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.verifyZitoPaymentSuccess = verifyZitoPaymentSuccess;
function createApplication(transcript) {
    const applicationRef = (0, firestore_1.doc)(db, 'users/' + transcript.user.email + '/transcripts', transcript.id);
    const transcriptRef = (0, firestore_1.doc)(db, 'transcripts', transcript.id);
    return Promise.all([(0, firestore_1.setDoc)(applicationRef, transcript), (0, firestore_1.setDoc)(transcriptRef, transcript)]);
}
exports.createApplication = createApplication;
function validateTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        const allApplications = yield getAllPendingApplications();
        allApplications.map((application, index) => __awaiter(this, void 0, void 0, function* () {
            yield (0, kcpayment_api_1.delay)();
            try {
                const result = yield verifyZitoPaymentSuccess(application.id);
                if (result) {
                    yield createApplication(application);
                    yield deletePendingApplication(application);
                }
            }
            catch (err) {
                console.log(err);
            }
        }));
    });
}
exports.validateTransactions = validateTransactions;
function getAllPendingApplications() {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationRef = (0, firestore_1.collection)(db, "pending-applications");
        const doc = yield (0, firestore_1.getDocs)(applicationRef);
        return doc.docs.map(doc => doc.data());
    });
}
function deletePendingApplication(application) {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationRef = (0, firestore_1.doc)(db, "pending-applications", application.id);
        return yield (0, firestore_1.deleteDoc)(applicationRef);
    });
}
//# sourceMappingURL=transcriptpayment.api.js.map