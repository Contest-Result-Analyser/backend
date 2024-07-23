const express = require('express');
const router = express.Router();
const CallsignController = require('../controllers/callsignController');

router.get('/operator/get', CallsignController.getCallsign.bind(CallsignController));

module.exports = router;
