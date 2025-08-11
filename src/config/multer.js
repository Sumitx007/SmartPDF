const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// EXPLANATION: Storage configuration determines where and how files are saved
const storage = multer.diskStorage({
    // DESTINATION: Where to save uploaded files
    destination: function (req, file, cb) {
        // cb = callback function (error, destination)
        // null = no error, './storage/uploads' = save location
        cb(null, './storage/uploads');
    },
    
    // FILENAME: What to name the uploaded file
    filename: function (req, file, cb) {
        // Create unique filename to avoid conflicts
        // uuidv4() generates random unique ID like: a1b2c3d4-e5f6-7890-abcd-ef1234567890
        // path.extname() extracts file extension (.pdf, .docx, etc.)
        const uniqueName = uuidv4() + path.extname(file.originalname);
        
        // Store filename in request object for later use
        req.uploadedFilename = uniqueName;
        
        cb(null, uniqueName);
    }
});

// EXPLANATION: File filter validates uploaded files
const fileFilter = function (req, file, cb) {
    console.log('File being uploaded:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });
    
    // ALLOWED MIME TYPES: What file types we accept
    const allowedMimeTypes = [
        'application/pdf',           // PDF files
        'application/msword',        // Old Word files (.doc)
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // New Word files (.docx)
    ];
    
    // CHECK: Is this file type allowed?
    if (allowedMimeTypes.includes(file.mimetype)) {
        // Accept the file (null = no error, true = accept)
        cb(null, true);
    } else {
        // Reject the file with error message
        cb(new Error('Only PDF and Word documents are allowed!'), false);
    }
};

// EXPLANATION: Main multer configuration object
const upload = multer({
    storage: storage,           // Where and how to save files
    fileFilter: fileFilter,     // What files to accept
    limits: {
        fileSize: 10 * 1024 * 1024,  // 10MB max file size (bytes)
        files: 1                      // Only 1 file at a time
    }
});

// EXPLANATION: Export different upload types
module.exports = {
    // Single file upload with field name 'document'
    single: upload.single('document'),
    
    // Multiple files upload (for future batch processing)
    multiple: upload.array('documents', 5),  // Max 5 files
    
    // Direct access to multer instance
    upload: upload
};