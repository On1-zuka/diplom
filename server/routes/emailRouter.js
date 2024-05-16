const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-email-admin', emailController.sendEmailAdmin);
router.post('/send-email-user', emailController.sendEmailUser);

module.exports = router;