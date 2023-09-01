const express = require('express');
const router = express.Router();
const authController = require("../../controllers/auth");


router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);

module.exports = router;