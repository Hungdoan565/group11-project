const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route GET tất cả user
router.get('/users', userController.getUsers);

// Route POST tạo user mới
router.post('/users', userController.createUser);

module.exports = router;