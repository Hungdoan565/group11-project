const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route GET tất cả user
router.get('/users', userController.getUsers);

// Route POST tạo user mới
router.post('/users', userController.createUser);

// Route PUT cập nhật user
router.put('/users/:id', userController.updateUser);

// Route DELETE xóa user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;