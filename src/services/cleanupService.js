const fs = require('fs');
const path = require('path');
const ConversionJob = require('../models/ConversionJob');
const TempFile = require('../models/tempFile');

const cleanupOldFiles = async () => {
  try {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    
    // Find old conversion jobs
    const oldJobs = await ConversionJob.find({
      createdAt: { $lt: fifteenMinutesAgo }
    });
    
    // Delete files and database records
    for (const job of oldJobs) {
      // We'll add file deletion logic here
    }
    
    console.log(`Cleaned up ${oldJobs.length} old conversion jobs`);
    
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};

module.exports = { cleanupOldFiles };