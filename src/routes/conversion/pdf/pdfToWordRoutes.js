const express = require('express');
const router = express.Router();
const { upload } = require('../../../services/fileService');
const { handlePdfToWordConversion } = require('../../../controllers/conversion/pdf/pdfToWordController');

router.post('/convert', upload.single('pdfFile'), handlePdfToWordConversion);

module.exports = router;