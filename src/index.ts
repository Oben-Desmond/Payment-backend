

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { implementKCPayment, verifyKCDonations } from "./api/firebase/kcpayment.api";
import { validateTransactions, verifyZitoPaymentSuccess } from "./api/transcriptpayment.api";


const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json({ type: '*/*' }));
app.use(bodyParser.json())

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




app.post("/kc/payment", cors(), async (req, res) => {
    try {
        await implementKCPayment(res)
    } catch (err: any) {
        res.send({ message: err?.message || JSON.stringify(err) })
    }
    res.send({ message: "Successfuly registered prospects ", body: (req.body) });
});

app.get("/kc/payment", cors(), async (req, res) => {

    try {
        await implementKCPayment(res)
    } catch (err: any) {
        res.send({ message: err?.message || JSON.stringify(err) })
        console.log(err)
    }
    res.send({ message: "Successfuly registered prospects ", body: (req.body) });
});
app.get("/kc/donations", cors(), async (req, res) => {

    try {
        await verifyKCDonations(res)
    } catch (err: any) {
        res.send({ message: err?.message || JSON.stringify(err) })
        console.log(err)
    }
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly registered donations ", body: (req.body) });
});

app.post("/kc/donations", cors(), async (req, res) => {
    try {
        await verifyKCDonations(res)
    } catch (err: any) {
        res.send({ message: err?.message || JSON.stringify(err) })
        console.log(err)
    }
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly registered donations ", body: (req.body) });
});




app.post("/ta/verify", cors(), async (req, res) => {

    const result = await verifyZitoPaymentSuccess(req.body.id)
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    if (result) res.send({ message: "verification successful", status: 1 });
    else res.send({ message: "verification failed", status: -1 });
});

app.post("/ta/payment", cors(), async (req, res) => {

    await validateTransactions()
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly verified transactions", body: (req.body) });
});

app.get("/ta/verify", cors(), async (req, res) => {

    const result = await verifyZitoPaymentSuccess(req.body.id)
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    if (result) res.send({ message: "verification successful", status: 1 });
    else res.send({ message: "verification failed", status: -1 });
});

app.get("/ta/payment", cors(), async (req, res) => {

    await validateTransactions()
    // console.log({ message: "Successfuly registered prospects ", body: (req.body) })
    res.send({ message: "Successfuly verified transactions", body: (req.body) });
});




app.get("/", cors(), (req, res) => {


    res.send("WELCOME TO PAYMENTS");
});

// start the Express server
app.listen(port, () => {

    console.log(`server started at http://localhost:${port}`);
});


validateTransactions()