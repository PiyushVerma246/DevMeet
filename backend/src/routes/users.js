import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
      user.tagline = req.body.tagline || user.tagline;
      user.skills = req.body.skills || user.skills;
      user.interests = req.body.interests || user.interests;
      user.availability = req.body.availability || user.availability;
      user.experienceLevel = req.body.experienceLevel || user.experienceLevel;
      user.githubUsername = req.body.githubUsername || user.githubUsername;
      user.portfolioUrl = req.body.portfolioUrl || user.portfolioUrl;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get users for exploration/reco
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.availability) filters.availability = req.query.availability;
    if (req.query.experienceLevel) filters.experienceLevel = req.query.experienceLevel;

    // A simple text search in skills isn't perfect without a pipeline, 
    // but serves as a basic simulation.
    let users = await User.find(filters).select('-password').limit(50);
    
    if (req.query.skills) {
      const qs = req.query.skills.toLowerCase().split(',');
      users = users.filter(u => 
        u.skills.some(s => qs.includes(s.name.toLowerCase()))
      );
    }
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
