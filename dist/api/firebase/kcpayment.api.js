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
exports.delay = exports.makeProspectRegistered = exports.getLastCompetition = exports.makeDonorPaid = exports.getAllDonations = exports.getAllProspects = exports.verifyKCDonations = exports.implementKCPayment = void 0;
const firestore_1 = require("firebase/firestore");
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
function implementKCPayment(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const competition = yield getLastCompetition();
        const prospects = yield getAllProspects(competition.name);
        for (let i = 0; i < prospects.length; i++) {
            const prospect = prospects[i];
            const result = (yield axios_1.default.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=obendesmond&ref=${prospect.student.email}`)).data;
            yield delay();
            console.log(prospect.student.email, result.status);
            if (result.status === 1) {
                makeProspectRegistered(prospect, competition.name);
            }
        }
    });
}
exports.implementKCPayment = implementKCPayment;
function verifyKCDonations(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const donations = yield getAllDonations();
        // console.log(donations)
        for (let i = 0; i < donations.length; i++) {
            const donation = donations[i];
            const result = (yield axios_1.default.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=obendesmond&ref=${donation.ref}`)).data;
            yield delay();
            console.log(result.status, donation.ref, donation.contactEmail);
            if (result.status === 1) {
                makeDonorPaid(donation);
            }
        }
    });
}
exports.verifyKCDonations = verifyKCDonations;
function getAllProspects(competitionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const prospectRef = (0, firestore_1.collection)(_1.db, `competitions/${competitionId}/prospects`);
        const prospects = (yield (0, firestore_1.getDocs)(prospectRef)).docs.map((doc) => doc.data());
        return prospects;
    });
}
exports.getAllProspects = getAllProspects;
function getAllDonations() {
    return __awaiter(this, void 0, void 0, function* () {
        const donationsRef = (0, firestore_1.collection)((0, firestore_1.getFirestore)(), 'donations');
        return (0, firestore_1.getDocs)(donationsRef).then((res) => {
            return [...res.docs.map(doc => doc.data())];
        });
    });
}
exports.getAllDonations = getAllDonations;
function makeDonorPaid(donor) {
    return __awaiter(this, void 0, void 0, function* () {
        const donationRef = (0, firestore_1.doc)((0, firestore_1.getFirestore)(), 'donations', donor.ref);
        yield (0, firestore_1.setDoc)(donationRef, Object.assign(Object.assign({}, donor), { paid: true }));
        return (0, firestore_1.deleteDoc)(donationRef);
    });
}
exports.makeDonorPaid = makeDonorPaid;
function getLastCompetition() {
    return __awaiter(this, void 0, void 0, function* () {
        const competitionsref = (0, firestore_1.collection)(_1.db, 'competitions');
        const competitions = yield (0, firestore_1.getDocs)(competitionsref).then((res => res.docs.map((doc) => doc.data())));
        const sortedCompetition = competitions.sort((a, b) => a.timestamp >= b.timestamp ? 1 : -1);
        return sortedCompetition[0];
    });
}
exports.getLastCompetition = getLastCompetition;
function makeProspectRegistered(prospect, competitionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const registeredRef = (0, firestore_1.doc)(_1.db, `competitions/${competitionId}/registered`, prospect.student.email);
        const prospectRef = (0, firestore_1.doc)(_1.db, `competitions/${competitionId}/prospects`, prospect.student.email);
        yield (yield (0, firestore_1.setDoc)(registeredRef, prospect));
        return (yield (0, firestore_1.deleteDoc)(prospectRef));
    });
}
exports.makeProspectRegistered = makeProspectRegistered;
function delay(ms = 1000) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
exports.delay = delay;
//# sourceMappingURL=kcpayment.api.js.map