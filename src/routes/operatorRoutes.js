const express = require('express');
const router = express.Router();
const operatorController = require('../controllers/operatorController');

router.get('/operator', operatorController.get);

module.exports = router;
