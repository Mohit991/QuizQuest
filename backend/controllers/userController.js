const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils'); // For generating JWT tokens

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { name, age, gender, email, password } = req.body;

  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate age
  if (age < 1 || age > 80) {
    return res.status(400).json({ message: 'Age must be between 1 and 80' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new user
  const user = await User.create({ name, age, gender, email, password: hashedPassword });
  const token = generateToken(user.id); // Generate JWT token
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, name, email },
    token,
  });
});

// @route   POST /api/users/login
// @desc    Authenticate user and return token
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = generateToken(user.id);
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @route   GET /api/users
// @desc    Get all users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'age', 'gender', 'email', 'createdAt', 'updatedAt'],
  });

  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }

  res.status(200).json(users);
});

// @route   GET /api/users/:id
// @desc    Get a single user by ID
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = await User.findByPk(id, {
    attributes: ['id', 'name', 'age', 'gender', 'email', 'createdAt', 'updatedAt'],
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

// @route   PUT /api/users/:id
// @desc    Update a user by ID
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, email, password } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user fields
  user.name = name || user.name;
  user.age = age || user.age;
  user.gender = gender || user.gender;
  user.email = email || user.email;

  // Hash and update password only if provided
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  res.status(200).json({ message: 'User updated successfully', user: { id: user.id, name: user.name, email: user.email } });
});

// @route   DELETE /api/users/:id
// @desc    Delete a user by ID
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await user.destroy();
  res.status(200).json({ message: 'User deleted successfully' });
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
