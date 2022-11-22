import { collection, getFirestore, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'
import axios from 'axios'
import { db } from '.'


export async function implementKCPayment(res: any) {
    const competition: KCCompetitionApplication = await getLastCompetition()
    const prospects = await getAllProspects(competition.name)
    try {
        prospects.map(async (prospect: KCCompetitionApplication) => {
            const result = (await axios.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=democreator&ref=${prospect.student.email}`)).data as ZitoPayTransactionExistResponse;
            await delay()
            console.log(prospect, result.status);
            if (result.status === 1) {
                makeProspectRegistered(prospect, competition.name)
            }
            return result;
        })
    } catch (err: any) {
        res.send({ message: err?.message || JSON.stringify(err) })
    }

}

export async function getAllProspects(competitionId: string) {

    const prospectRef = collection(db, `competitions/${competitionId}/prospects`)
    const prospects = (await getDocs(prospectRef)).docs.map((doc) => doc.data() as KCCompetitionApplication)
    return prospects

}

export async function getLastCompetition() {

    const competitionsref = collection(db, 'competitions')

    const competitions = await getDocs(competitionsref).then((res => res.docs.map((doc) => doc.data() as KCCompetitionApplication)))

    const sortedCompetition = competitions.sort((a, b) => a.timestamp >= b.timestamp ? 1 : -1)

    return sortedCompetition[0]


}

export async function makeProspectRegistered(prospect: KCCompetitionApplication, competitionId: string) {
    const registeredRef = doc(db, `competitions/${competitionId}/registered`, prospect.student.email)
    const prospectRef = doc(db, `competitions/${competitionId}/prospects`, prospect.student.email)
    await (await setDoc(registeredRef, prospect))
    return (await deleteDoc(prospectRef))
}


function delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





export interface KCUser {
    name: string,
    email: string,
    password: string
}

export interface KCAdmin extends KCUser {
    type: "ADMIN" | "STUDENT"
}

export interface KCStudent extends KCUser {

    form: string,
    city: string,
    email: string,
    registeredOn: number,
    school: string,
    phone: string,
    age: string

}

export interface KCCompetition {
    name: string,
    levels: {
        id: 'ADVANCED' | "ORDINARY",
        name: string,
        streams: any[]

    }[],
    description: string,
    timestamp: string,
    accepting: boolean
}

export interface KCCompetitionApplication {
    timestamp: number,
    name: string,
    level: {
        id: 'ADVANCED' | "ORDINARY",
        name: string,
        stream: any

    },
    student: KCStudent
}


export interface ZitoPayTransactionExistResponse {

    "username": string,
    "email": string,
    "ref": string,
    "trade_id": number,
    "currency_code": string,
    "amount": number,
    "commission_for_receiver": number,
    "total_received": number,
    "memo": string,
    "date_time": string,
    "status": number,
    "status_msg": "COMPLETED",
    "probation_successful": 1,
    "probation_until": string,
    "type": "TRANSFER",
    "payment_method": string,
    "blockchain_txid": "",
    "original_amount": number,
    "original_currency_code": string,
    "info": string,
    "meta_info": any

}