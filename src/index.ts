

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
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



// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// define a route handler for the default home page

app.post("/", cors(), (req, res) => {


    res.send({ message: "Hello world!", body: req.body });
});

// start the Express server
app.listen(port, () => {

    console.log(`server started at http://localhost:${port}`);
});