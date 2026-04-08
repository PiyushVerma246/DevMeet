import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    tagline: { type: String, default: 'Building the future' },
    bio: { type: String, default: '' },
    skills: [
      {
        name: { type: String },
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
      },
    ],
    interests: [{ type: String }],
    availability: {
      type: String,
      enum: ['Active', 'Exploring', 'Busy', 'Hackathon Mode'],
      default: 'Exploring',
    },
    experienceLevel: {
      type: String,
      enum: ['Junior', 'Mid', 'Senior', 'Lead'],
      default: 'Mid',
    },
    githubUsername: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    reputationScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
