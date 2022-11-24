import axios from "axios";
import { delay, ZitoPayTransactionExistResponse } from "./firebase/kcpayment.api";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, initializeAuth, indexedDBLocalPersistence, User, } from "firebase/auth";
import { getStorage } from "firebase/storage";


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
const app = initializeApp(firebaseConfig, "transcript-app");
const db = getFirestore(app)

export async function verifyZitoPaymentSuccess(transcriptID: string) {

    const result = (await axios.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=democreator&ref=${transcriptID}`)).data as ZitoPayTransactionExistResponse;

    if (result.status == 1) {
        return true;
    }
    else {
        return false
    }


}

export function createApplication(transcript: Transcript) {

    const applicationRef = doc(db, 'users/' + transcript.user.email + '/transcripts', transcript.id)
    const transcriptRef = doc(db, 'transcripts', transcript.id)

    return Promise.all([setDoc(applicationRef, transcript), setDoc(transcriptRef, transcript)])

}


export async function validateTransactions() {
    const allApplications = await getAllPendingApplications()
    allApplications.map(async (application, index) => {
        await delay()
        try {
            const result = await verifyZitoPaymentSuccess(application.id)
            if (result) {
                await createApplication(application)
                await deletePendingApplication(application)
            }
        } catch (err) {
            console.log(err)
        }

    })
}


async function getAllPendingApplications(): Promise<Transcript[]> {
    const applicationRef = collection(db, "pending-applications")
    const doc = await getDocs(applicationRef);
    return doc.docs.map(doc => doc.data() as Transcript);
}

async function deletePendingApplication(application: Transcript) {
    const applicationRef = doc(db, "pending-applications", application.id);
    return await deleteDoc(applicationRef);

}

export interface Transcript {
    id: string,
    timestamp: number,
    matricule: string,
    faculty: string,
    department: string,
    names: string,
    phone: string,
    mode: {
        id: string,
        name: string,
        price: number
    },
    collect: boolean,
    currentStudent: boolean,
    screenshot?: string,
    user?: User,
    adminMessage?: string,
    approxDeliveryDate?: number,
    status: "INCOMING" | "PENDING" | "APPLIED" | "COLLECTED" | "DELIVERED" | "REJECTED",
    deliveryType: string,
    message?: string,
    file?: string
}