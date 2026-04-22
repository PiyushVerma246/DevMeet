import express from 'express';
import Application from '../models/Application.js';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to get total unique team members of a project
const getTeamMembers = async (projectId) => {
  const project = await Project.findById(projectId);
  if (!project) return [];
  const members = new Set([project.creator.toString()]);
  project.rolesNeeded.forEach(r => {
    if (r.isFilled && r.filledBy) {
      members.add(r.filledBy.toString());
    }
  });
  return Array.from(members);
};

// User applies to join a project
router.post('/apply', protect, async (req, res) => {
  try {
    const { projectId, role } = req.body;
    const existing = await Application.findOne({ userId: req.user.id, projectId, role });
    if (existing) return res.status(400).json({ error: 'You have already applied for this role.' });
    
    const application = new Application({
      userId: req.user.id,
      projectId,
      role
    });
    
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin/Team-only gets applications
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const mems = await getTeamMembers(req.params.projectId);
    if (!mems.includes(req.user.id)) {
      return res.status(403).json({ error: 'Not authorized to view applications for this project.' });
    }
    
    // Using populate assuming User model exists and returns name/email
    const apps = await Application.find({ projectId: req.params.projectId })
      .populate('userId', 'name email github')
      .populate('votes.voterId', 'name');
      
    res.json({ teamSize: mems.length, applications: apps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vote on an application
router.post('/:id/vote', protect, async (req, res) => {
  try {
    const { vote } = req.body; // "approve" or "reject"
    if (!['approve', 'reject'].includes(vote)) {
      return res.status(400).json({ error: 'Invalid vote type' });
    }
    
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    if (application.status !== 'pending') {
      return res.status(400).json({ error: `Voting is closed. Status is already ${application.status}.` });
    }

    const teamMembers = await getTeamMembers(application.projectId);
    if (!teamMembers.includes(req.user.id)) {
      return res.status(403).json({ error: 'Only current team members can cast a vote on this project.' });
    }

    const alreadyVoted = application.votes.find(v => v.voterId.toString() === req.user.id);
    if (alreadyVoted) return res.status(400).json({ error: 'You have already cast your vote.' });

    // Add the vote
    application.votes.push({ voterId: req.user.id, vote });

    // Tally Consensus
    const totalMembers = teamMembers.length;
    const approvals = application.votes.filter(v => v.vote === 'approve').length;
    const rejections = application.votes.filter(v => v.vote === 'reject').length;

    // Rules: >= 70% approve -> accepted. > 50% reject -> rejected.
    if (approvals / totalMembers >= 0.7) {
      application.status = 'accepted';
      
      // Bonus: auto-fill the project role
      const project = await Project.findById(application.projectId);
      const roleIndex = project.rolesNeeded.findIndex(r => r.title === application.role && !r.isFilled);
      if (roleIndex > -1) {
        project.rolesNeeded[roleIndex].isFilled = true;
        project.rolesNeeded[roleIndex].filledBy = application.userId;
        await project.save();
      }
    } else if (rejections / totalMembers > 0.5) {
      application.status = 'rejected';
    }

    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
