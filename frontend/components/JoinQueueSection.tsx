"use client";
import { useState, useCallback } from 'react';
import { Plus, X, User, Briefcase, Tag, Trophy } from 'lucide-react';
import Link from 'next/link';
import debounce from 'lodash.debounce';

export default function JoinQueueSection() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'You',
    role: 'Full Stack Eng',
    skills: 'React, Tailwind, Node.js',
    bio: "I am ready to build and win! Let's team up.",
    hackathonName: 'ETHGlobal London',
  });

  const handleJoinQueue = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would POST to the backend; for now we just close.
    setShowModal(false);
  };

  const debouncedSetSearch = useCallback(
    debounce((value: string) => setFormData(prev => ({ ...prev, name: value })), 300),
    []
  );

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setShowModal(true)}
        className="mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-foreground/5 border border-foreground/10 hover:border-pink-500/50 hover:bg-foreground/10 rounded-full text-foreground font-semibold transition-all shadow-lg shadow-pink-500/5"
      >
        <Plus size={20} className="text-pink-400" /> List Yourself in the Queue
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-card w-full max-w-md p-8 rounded-3xl relative border border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-accent/10 backdrop-blur-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors border border-foreground/10 rounded-full p-1 bg-foreground/5 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
            >
              <X size={18} />
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-4 pt-2 text-center">Join the Hackathon Queue</h2>
            <p className="text-sm text-foreground/70 mb-6 text-center">Fill the form below so teams can discover you.</p>

            <form onSubmit={handleJoinQueue} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex items-center gap-3 bg-foreground/5 rounded-xl px-3 py-2 border border-foreground/10">
                <User size={18} className="text-pink-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="flex-1 bg-transparent border-none text-foreground placeholder-white/50 focus:outline-none"
                  required
                />
              </div>
              {/* Role */}
              <div className="flex items-center gap-3 bg-foreground/5 rounded-xl px-3 py-2 border border-foreground/10">
                <Briefcase size={18} className="text-pink-400" />
                <input
                  type="text"
                  placeholder="Primary Role"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="flex-1 bg-transparent border-none text-foreground placeholder-white/50 focus:outline-none"
                  required
                />
              </div>
              {/* Skills */}
              <div className="flex items-center gap-3 bg-foreground/5 rounded-xl px-3 py-2 border border-foreground/10">
                <Tag size={18} className="text-pink-400" />
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  className="flex-1 bg-transparent border-none text-foreground placeholder-white/50 focus:outline-none"
                  required
                />
              </div>
              {/* Target Hackathon */}
              <div className="flex items-center gap-3 bg-foreground/5 rounded-xl px-3 py-2 border border-foreground/10">
                <Trophy size={18} className="text-pink-400" />
                <input
                  type="text"
                  placeholder="Target Hackathon"
                  value={formData.hackathonName}
                  onChange={e => setFormData({ ...formData, hackathonName: e.target.value })}
                  className="flex-1 bg-transparent border-none text-foreground placeholder-white/50 focus:outline-none"
                  required
                />
              </div>
              {/* Bio */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-foreground/50">Elevator Pitch (Bio)</label>
                <textarea
                  placeholder="A short pitch that sells your expertise"
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full h-24 bg-foreground/5 border border-foreground/10 rounded-xl p-3 text-foreground placeholder-white/50 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-foreground/5 text-foreground/70 rounded-xl border border-foreground/10 hover:bg-foreground/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-pink-500 text-foreground rounded-xl font-bold shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:bg-pink-600 transition-colors"
                >
                  Add Me
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
