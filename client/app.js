const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');
const randomstring = require("randomstring");
const app = express()
const port = 3000

const log = require('simple-node-logger').createSimpleLogger('client.log');

// create application/json parser
var jsonParser = bodyParser.json()

app.post('/order', jsonParser, function (req, res) {
    var json = JSON.stringify({ 'product': randomstring.generate(12) });
    axios.post('http://localhost:6000/order', json, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        log.info('POST /order ', response.data);
        res.json(response.data);
    });
})

app.get('/order/:orderId', (req, res) => {
    axios.get('http://localhost:6000/order/' + req.params.orderId).then(function (response) {
        log.info('GET /order/', req.params.orderId, ' ', response.data);
        res.json(response.data);
    });
})

app.get('/delivery/:orderId', (req, res) => {
    axios.get('http://localhost:6000/delivery/' + req.params.orderId).then(function (response) {
        log.info('GET /order/', req.params.orderId, ' ', response.data);
        res.json(response.data);
    });
})

app.listen(port, () => {
    log.info('Client API listening on port ', port);
})