const { cleanupOldFiles } = require('../services/cleanupService');

const startCleanupScheduler = () => {
  // Run cleanup every 5 minutes
  setInterval(cleanupOldFiles, 5 * 60 * 1000);
  console.log('Cleanup scheduler started - runs every 5 minutes');
};

module.exports = { startCleanupScheduler };