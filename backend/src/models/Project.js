import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamSize: { type: Number, default: 4 },
    rolesNeeded: [
      {
        title: { type: String, required: true },
        skills: [{ type: String }],
        isFilled: { type: Boolean, default: false },
        filledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      },
    ],
    status: {
      type: String,
      enum: ['Ideation', 'Building', 'Completed', 'Paused'],
      default: 'Ideation',
    },
    tags: [{ type: String }],
    githubRepo: { type: String },
    demoUrl: { type: String },
    isHackathonProject: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
