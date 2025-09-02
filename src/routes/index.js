const express = require('express');
const router = express.Router();
const conversionRoutes = require('./conversion/index');

router.use('/api/conversion', conversionRoutes);

module.exports = router;