const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

const log = require('simple-node-logger').createSimpleLogger('delivery.log');

// create application/json parser
var jsonParser = bodyParser.json()

// delivery database
var deliveries = {}

app.post('/delivery', jsonParser, function (req, res) {
    delivery = { 'order_id': req.body.order_id, 'status':'On its way'}
    deliveries[req.body.order_id] = delivery;

    log.info('POST /delivery ', delivery);

    res.json(delivery);
})

app.get('/delivery/:order_id', jsonParser, (req, res) => {
    log.info('GET /delivery/', req.params.order_id, ' ', deliveries[req.params.order_id]);

    res.json(deliveries[req.params.order_id]);
})

app.put('/delivery/:order_id', jsonParser, (req, res) => {
    deliveries[req.params.order_id]['status'] = 'Delivered';

    log.info('PUT /delivery/', req.params.order_id, ' ', deliveries[req.params.order_id]);

    res.json(deliveries[req.params.order_id]);
})

app.listen(port, () => {
    log.info('Delivery API listening on port ', port);
})