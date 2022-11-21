"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
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
// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// define a route handler for the default home page
app.post("/", (0, cors_1.default)(), (req, res) => {
    console.log(req, "body");
    res.send({ message: "Hello world!", body: (req.body) });
});
app.get("/", (0, cors_1.default)(), (req, res) => {
    res.send("WELCOME TO PAYMENTS");
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map