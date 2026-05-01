const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/professional', homeController.getIndex);

module.exports = router;