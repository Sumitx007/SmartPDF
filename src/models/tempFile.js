const mongoose = require('mongoose')

const tempFileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true        
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('tempFile', tempFileSchema);