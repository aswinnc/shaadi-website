const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.sendContactEmail);
router.post('/subscribe', contactController.subscribeNewsletter);

module.exports = router;
