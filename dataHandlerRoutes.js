const express = require('express');
const router = express.Router();
const dataHandlerController = require('../controllers/dataHandlerController');

router.post('/server/incoming_data', dataHandlerController.handleIncomingData);

module.exports = router;
