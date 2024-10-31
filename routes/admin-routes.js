const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

// Route to view all users
router.get('/users', adminController.viewUsers);

// Route to view a specific user
router.get('/users/:userId', adminController.viewUser);

// Route to edit a specific user
router.get('/users/edit/:userId', adminController.editUser);

// Route to handle updating user info
router.post('/users/edit/:userId', adminController.updateUser);

module.exports = router;