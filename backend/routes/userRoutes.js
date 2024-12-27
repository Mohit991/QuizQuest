const express = require('express');
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createUser); // Public route for registration
router.post('/login', loginUser); // Public route for login

router.get('/', protect, getAllUsers); // Protected route to get all users
router.get('/:id', protect, getUserById); // Protected route to get user by ID
router.put('/:id', protect, updateUser); // Protected route to update user
router.delete('/:id', protect, deleteUser); // Protected route to delete user

module.exports = router;
