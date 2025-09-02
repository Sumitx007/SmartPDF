const express = require('express');
const router = express.Router();
const pdfToWordRoutes = require('./pdf/pdfToWordRoutes')

router.use('/pdf-to-word', pdfToWordRoutes);

module.exports = router;
