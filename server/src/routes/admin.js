const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const User = require('../models/User');
const CareerPath = require('../models/CareerPath');

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', [auth, adminAuth], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/career-paths
// @desc    Get all career paths
// @access  Private/Admin
router.get('/career-paths', [auth, adminAuth], async (req, res) => {
  try {
    const careerPaths = await CareerPath.find().populate('user', 'name email');
    res.json(careerPaths);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/users/:id
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', [auth, adminAuth], async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Delete associated career paths
    await CareerPath.deleteMany({ user: req.params.id });

    res.json({ msg: 'User and associated career paths deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/stats
// @desc    Get application statistics
// @access  Private/Admin
router.get('/stats', [auth, adminAuth], async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCareerPaths = await CareerPath.countDocuments();
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');
    const recentCareerPaths = await CareerPath.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    res.json({
      totalUsers,
      totalCareerPaths,
      recentUsers,
      recentCareerPaths
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 