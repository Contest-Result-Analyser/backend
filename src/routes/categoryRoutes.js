const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/test', CategoryController.test);

module.exports = router;
