// const functions = require("firebase-functions");
// const express = require("express")
// const cors = require("cors")
// const stripe = require("stripe")('sk_test_51IgwwgSChHG8M6kZiOwMldM8rBOdxfgAricOpCgQfRmm7PxXYrGH0OcdczxpeUzQVG4sTEG03qs5qOOhuWUmiayu00V4rVnclO')

// // API

// // API Config
// const app = express();

// // middleware
// app.use(cors({origin: true}));
// app.use(express.json());

// // api routes 
// app.get('/', (request, response) => response.status(200).send
// ('hello world'))
// app.get('/shubham', (request, response) => response.status(200).send
// ('hi shubham'))
// app.post('/payments/create', async (request, response) => {
//     const total = request.query.total;

//     console.log('Payment request Recieved! for this amount >>>', total)

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total, //subunits of the currency
//         currency: "usd",        
//     })

//     //ok created
//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret
//     })
// })

// // listen command
// exports.api = functions.https.onRequest(app)
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IgwwgSChHG8M6kZiOwMldM8rBOdxfgAricOpCgQfRmm7PxXYrGH0cdczxpeUzQVG4sTEG03qs5qOOhuWUmiayu00V4rVnclO');

// API Config
 app = express();

// middleware
app.use(cors({origin: true}));
app.use(express.json());

// api routes 
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment request received! for this amount >>>', total);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, //subunits of the currency
            currency: "usd",        
        });

        console.log('Client secret:', paymentIntent.client_secret);

        //ok created
        response.status(201).send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);

        response.status(500).send({
            error: error.message
        });
    }
});

// listen command
exports.api = functions.https.onRequest(app);



//local endpoint
//http://localhost:5001/fly-buy-6c344/us-central1/api