const { convertPdfToWord } = require('../../../services/conversion/pdf/pdfToWordService');
const ConversionJob = require('../../../models/ConversionJob');
const path = require('path');

const handlePdfToWordConversion = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create conversion job record
    const conversionJob = new ConversionJob({
      originalFilename: req.file.originalname,
      conversionType: 'pdf-to-word',
      status: 'processing'
    });
    await conversionJob.save();

    // Convert the file
    const inputPath = req.file.path;
    const outputDir = 'storage/processed/';
    
    const outputPath = await convertPdfToWord(inputPath, outputDir);

    // Update job status
    conversionJob.status = 'completed';
    await conversionJob.save();

    res.json({
      message: 'Conversion successful',
      jobId: conversionJob._id,
      downloadPath: path.basename(outputPath)
    });

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
};

module.exports = { handlePdfToWordConversion };