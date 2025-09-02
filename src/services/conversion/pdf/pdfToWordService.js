const axios = require('axios');
const fs = require('fs');
const path = require('path');

const convertPdfToWord = async (inputFilePath, outputDir) => {
  try {
    const convertApiSecret = process.env.CONVERTAPI_SECRET;
    
    // Read the PDF file
    const fileData = fs.readFileSync(inputFilePath);
    const base64Data = fileData.toString('base64');
    
    // ConvertAPI request
    const response = await axios.post(`https://v2.convertapi.com/convert/pdf/to/docx?Secret=${convertApiSecret}`, {
      Parameters: [
        {
          Name: 'File',
          FileValue: {
            Name: path.basename(inputFilePath),
            Data: base64Data
          }
        }
      ]
    });
    
    // Get the converted file data (it's in base64)
    const convertedFileData = response.data.Files[0].FileData;
    const outputFileName = path.basename(inputFilePath, '.pdf') + '.docx';
    const outputFilePath = path.join(outputDir, outputFileName);
    
    // Convert base64 to buffer and save
    const buffer = Buffer.from(convertedFileData, 'base64');
    fs.writeFileSync(outputFilePath, buffer);
    
    return outputFilePath;
    
  } catch (error) {
    console.log('Full error:', error.response?.data || error.message);
    throw new Error(`Conversion failed: ${error.message}`);
  }
};

module.exports = { convertPdfToWord };