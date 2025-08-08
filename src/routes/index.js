const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('pages/home', { 
        title: 'SmartPDF - Privacy-First PDF Tools',
        heading: 'Welcome to SmartPDF'
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('pages/about', { 
        title: 'About SmartPDF',
        heading: 'About SmartPDF'
    });
});

module.exports = router;