const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// In-memory user storage
const users = [];

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check if user exists
      if (users.find(user => user.email === email)) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user with extended profile
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: 'user',
        profile: {
          photo: '',
          bio: '',
          location: '',
          education: [],
          experience: [],
          skills: [],
          interests: [],
          languages: [],
          certifications: [],
          socialLinks: {
            linkedin: '',
            github: '',
            twitter: '',
            portfolio: ''
          },
          contactInfo: {
            phone: '',
            address: ''
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      users.push(newUser);

      // Create JWT token
      const payload = {
        user: {
          id: newUser.id,
          role: newUser.role
        }
      };

      jwt.sign(
        payload,
        'your_jwt_secret',
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = users.find(user => user.email === email);
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        'your_jwt_secret',
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = users.find(user => user.id === decoded.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return user data without password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 