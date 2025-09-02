const multer = require('multer'); //yesley chai as a middleware act garxa to handle file uploads
const path = require('path'); // yesley chai hamilai file path haru milauna help garxa
const { v4: uuidv4 } = require('uuid'); // Universally Unique Identifier hami chai yeslai file ko namm unique rakhna use garxam hai ta hahaha


const storage =  multer.diskStorage({
    destination: function (req, file, cb) { //yesley chai ka gayera file upload hune vanera location dekhaidinxa
        cb(null, 'storage/uploads'); 
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

/* creating the instance of multer 
yesley chai upload vayeko file haru kaaha ra kasari rakhne vanera vanxa
yedi yesko instance nabanayera yetikai use garo vane mathi ko function
haru use hudaina ani temporarily RAM mai store garxa
const upload = multer(); garyo vane, tesailey instance banako.*/

const upload = multer({storage: storage});

module.exports = { upload };

