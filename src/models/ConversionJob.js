const mongoose = require('mongoose');

const conversionJobSchema = new mongoose.Schema({
  originalFilename: {  // lowercase 'o' and 'f'
    type: String,
    required: true
  },
  conversionType: {    // lowercase 'c' and 't'
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'processing'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ConversionJob', conversionJobSchema);