const express = require('express');
const router = express.Router();
const ContestController = require('../controllers/contestController');
const CallsignController = require("../controllers/callsignController");

router.get('/get/name', ContestController.getByName.bind(ContestController));
router.get('/get/id', ContestController.getByID.bind(ContestController));

module.exports = router;
