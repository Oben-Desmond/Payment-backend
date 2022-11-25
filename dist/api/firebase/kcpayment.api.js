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
exports.delay = exports.makeProspectRegistered = exports.getLastCompetition = exports.getAllProspects = exports.implementKCPayment = void 0;
const firestore_1 = require("firebase/firestore");
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
function implementKCPayment(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const competition = yield getLastCompetition();
        const prospects = yield getAllProspects(competition.name);
        try {
            prospects.map((prospect) => __awaiter(this, void 0, void 0, function* () {
                const result = (yield axios_1.default.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=democreator&ref=${prospect.student.email}`)).data;
                yield delay();
                console.log(prospect, result.status);
                if (result.status === 1) {
                    makeProspectRegistered(prospect, competition.name);
                }
                return result;
            }));
        }
        catch (err) {
            res.send({ message: (err === null || err === void 0 ? void 0 : err.message) || JSON.stringify(err) });
        }
    });
}
exports.implementKCPayment = implementKCPayment;
function getAllProspects(competitionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const prospectRef = (0, firestore_1.collection)(_1.db, `competitions/${competitionId}/prospects`);
        const prospects = (yield (0, firestore_1.getDocs)(prospectRef)).docs.map((doc) => doc.data());
        return prospects;
    });
}
exports.getAllProspects = getAllProspects;
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