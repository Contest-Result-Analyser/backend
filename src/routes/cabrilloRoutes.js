const express = require('express');
const router = express.Router();
const CabrilloController = require('../controllers/cabrilloController');

router.get('/insert', CabrilloController.parseFile.bind(CabrilloController));

module.exports = router;
