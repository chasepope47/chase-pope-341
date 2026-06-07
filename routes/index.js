const express = require('express');
const router = express.Router();

router.use('/items', require('./items'));
router.use('/notes', require('./notes'));

module.exports = router;
