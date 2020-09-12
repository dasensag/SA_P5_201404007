const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');
const app = express()
const port = 6000

const log = require('simple-node-logger').createSimpleLogger('esb.log');

// create application/json parser
var jsonParser = bodyParser.json()

app.get('/order/:orderId', (req, res) => {
    axios.get('http://localhost:4000/order/' + req.params.orderId).then(function (response) {
        log.info('GET /order/', req.params.orderId, ' ', response.data);
        res.json(response.data);
    });
})

app.post('/order', jsonParser, function (req, res) {
    //var json = JSON.stringify({ 'product': randomstring.generate(12) });
    axios.post('http://localhost:4000/order', req.body, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        log.info('POST /order ', response.data);
        res.json(response.data);
    });
})

app.get('/delivery/:orderId', (req, res) => {
    axios.get('http://localhost:5000/delivery/' + req.params.orderId).then(function (response) {
        log.info('GET /order/', req.params.orderId, ' ', response.data);
        res.json(response.data);
    });
})

app.post('/delivery', jsonParser, (req, res) => {
    axios.post('http://localhost:5000/delivery', req.body, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        log.info('PUT /order/', req.params.orderId, ' ', response.data);
        res.json(response.data);
    });
})

app.listen(port, () => {
    log.info('EBS started on port ', port);
})