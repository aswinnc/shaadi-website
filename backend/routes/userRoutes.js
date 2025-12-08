const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// User Registration is often under /users/register in the frontend calls
router.post('/register', authController.register);

// Profile Management
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);

// Password Reset (Mock)
router.post('/request-reset', userController.requestReset);
router.post('/reset-password', userController.resetPassword);

module.exports = router;
