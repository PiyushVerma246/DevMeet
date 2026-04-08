import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    votes: [
      {
        voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        vote: { type: String, enum: ['approve', 'reject'], required: true },
      },
    ],
  },
  { timestamps: true }
);

// Prevent multiple applications to the same project by the same user for the same role
applicationSchema.index({ userId: 1, projectId: 1, role: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
