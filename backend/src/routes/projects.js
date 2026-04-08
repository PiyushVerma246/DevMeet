import express from 'express';
import { protect } from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { title, description, teamSize, rolesNeeded, tags, isHackathonProject } = req.body;

  try {
    const project = await Project.create({
      title,
      description,
      creator: req.user._id,
      teamSize,
      rolesNeeded,
      tags,
      isHackathonProject,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.isHackathonProject === 'true') {
      filters.isHackathonProject = true;
    }
    const projects = await Project.find(filters).populate('creator', 'name avatarUrl').sort('-createdAt');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator', 'name avatarUrl githubUsername')
      .populate('rolesNeeded.filledBy', 'name avatarUrl');

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/join', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const roleId = req.body.roleId; // ID of the role they want to apply for

    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Assuming instant acceptance for demo purposes 
    // In reality, this would create a CollaborationRequest
    const role = project.rolesNeeded.id(roleId);
    if (role && !role.isFilled) {
      role.isFilled = true;
      role.filledBy = req.user._id;
      // also push to members collection if not already there
      await project.save();
      res.json(project);
    } else {
      res.status(400).json({ message: 'Role not available or already filled' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
