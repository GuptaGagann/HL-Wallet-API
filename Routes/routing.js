const express = require('express');
const routing = express.Router();
const walletController = require('../Controller/walletController');
routing.post('/setup', walletController.setup);
routing.post('/transact/:walletId', walletController.transact);
routing.get('/transactions', walletController.transactions);
routing.get('/walletDetails/:id', walletController.walletDetails);
module.exports = routing;