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
exports.verifyZitoPaymentSuccess = void 0;
const axios_1 = __importDefault(require("axios"));
function verifyZitoPaymentSuccess(transcriptID) {
    return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
        const url = `https://zitopay.africa/api_v1?action=get_transaction&receiver=democreator&ref=${transcriptID}`;
        console.log(url);
        const result = (yield axios_1.default.get(url, {
            headers: { "Accept": "application/json" },
        }));
=======
        const result = (yield axios_1.default.get(`https://zitopay.africa/api_v1?action=get_transaction&receiver=democreator&ref=${transcriptID}`)).data;
>>>>>>> parent of d190e99... added firebase for transcript assistant api
        console.log(result);
        if (result.status == 1) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.verifyZitoPaymentSuccess = verifyZitoPaymentSuccess;
//# sourceMappingURL=transcriptpayment.api.js.map