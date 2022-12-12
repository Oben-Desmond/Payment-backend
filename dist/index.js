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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const kcpayment_api_1 = require("./api/firebase/kcpayment.api");
const transcriptpayment_api_1 = require("./api/transcriptpayment.api");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080; // default port to listen
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.use(express.json({ type: '*/*' }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "true");
    // Pass to next layer of middleware
    next();
});
app.post("/kc/payment", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, kcpayment_api_1.implementKCPayment)(res);
    }
    catch (err) {
        res.send({ message: (err === null || err === void 0 ? void 0 : err.message) || JSON.stringify(err) });
    }
    res.send({ message: "Successfuly registered prospects ", body: (req.body) });
}));
app.get("/kc/payment", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, kcpayment_api_1.implementKCPayment)(res);
    }
    catch (err) {
        res.send({ message: (err === null || err === void 0 ? void 0 : err.message) || JSON.stringify(err) });
        console.log(err);
    }
    res.send({ message: "Successfuly registered prospects ", body: (req.body) });
}));
app.get("/kc/donations", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, kcpayment_api_1.verifyKCDonations)(res);
    }
    catch (err) {
        res.send({ message: (err === null || err === void 0 ? void 0 : err.message) || JSON.stringify(err) });
        console.log(err);
    }
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly registered donations ", body: (req.body) });
}));
app.post("/kc/donations", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, kcpayment_api_1.verifyKCDonations)(res);
    }
    catch (err) {
        res.send({ message: (err === null || err === void 0 ? void 0 : err.message) || JSON.stringify(err) });
        console.log(err);
    }
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly registered donations ", body: (req.body) });
}));
app.post("/ta/verify", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, transcriptpayment_api_1.verifyZitoPaymentSuccess)(req.body.id);
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    if (result)
        res.send({ message: "verification successful", status: 1 });
    else
        res.send({ message: "verification failed", status: -1 });
}));
app.post("/ta/payment", (0, cors_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, transcriptpayment_api_1.validateTransactions)();
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly verified transactions", body: (req.body) });
}));
app.get("/", (0, cors_1.default)(), (req, res) => {
    res.send("WELCOME TO PAYMENTS");
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
(0, transcriptpayment_api_1.validateTransactions)();
//# sourceMappingURL=index.js.map