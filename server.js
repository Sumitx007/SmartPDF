require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const { startCleanupScheduler } = require('./src/jobs/cleanupScheduler');

// injecting the variables from the .env file
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Database connection
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Mongo DB connected successfully.");
        startCleanupScheduler(); 

})
.catch((error) => {
    console.log("Mongo DB connection Failed.");
})

// using port no. 3000 to host
app.listen(PORT , () => {
    console.log("App is running in port: ",PORT);
})
