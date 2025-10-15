const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route GET Tất Cả User
router.get('/users', userController.getUsers);

// Route POST Tạo User Mới
router.post('/users', userController.createUser);

// Route PUT Cập Nhật User
router.put('/users/:id', userController.updateUser);

// Route DELETE Xóa User
router.delete('/users/:id', userController.deleteUser);

module.exports = router;