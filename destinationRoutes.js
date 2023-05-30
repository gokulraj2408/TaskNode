const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.post('/destinations', destinationController.createDestination);
router.get('/destinations/:id', destinationController.getDestination);
router.put('/destinations/:id', destinationController.updateDestination);
router.delete('/destinations/:id', destinationController.deleteDestination);

module.exports = router;
