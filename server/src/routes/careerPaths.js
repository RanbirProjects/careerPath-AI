const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const CareerPath = require('../models/CareerPath');

// Get all career paths for a user
router.get('/', auth, async (req, res) => {
  try {
    const careerPaths = await CareerPath.find({ user: req.user.id });
    res.json(careerPaths);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Generate a new career path
router.post('/', auth, async (req, res) => {
  try {
    const { interests, skills, goals } = req.body;

    // Create a sample career path (temporary solution)
    const careerPathData = {
      user: req.user.id,
      title: "Software Developer",
      description: "A career path in software development focusing on building scalable applications.",
      requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
      learningResources: [
        {
          title: "MDN Web Docs",
          description: "Comprehensive documentation for web technologies"
        },
        {
          title: "freeCodeCamp",
          description: "Free interactive coding tutorials"
        }
      ],
      timeline: [
        {
          stage: "Beginner",
          description: "Learn fundamentals of programming and web development"
        },
        {
          stage: "Intermediate",
          description: "Build full-stack applications and learn advanced concepts"
        },
        {
          stage: "Advanced",
          description: "Master system design and architecture"
        }
      ],
      salaryRange: {
        entry: "$60,000 - $80,000",
        mid: "$90,000 - $120,000",
        senior: "$130,000 - $180,000"
      },
      jobMarket: {
        demand: "High",
        growth: "Above Average"
      }
    };

    const careerPath = new CareerPath(careerPathData);
    await careerPath.save();

    res.json(careerPath);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a career path
router.delete('/:id', auth, async (req, res) => {
  try {
    const careerPath = await CareerPath.findById(req.params.id);
    if (!careerPath) {
      return res.status(404).json({ msg: 'Career path not found' });
    }

    if (careerPath.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await careerPath.remove();
    res.json({ msg: 'Career path removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 