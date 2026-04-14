"use client";

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

// Expected props:
// application: The application object returned from the API
// teamSize: Total number of members currently on the project team
// onVote: async callback function signature (applicationId, voteType)
// currentUserId: to check if the user viewing has already cast a vote

export default function VotingCard({ application, teamSize, onVote, currentUserId }: any) {
  const [loading, setLoading] = useState(false);

  const handleVote = async (vote: 'approve' | 'reject') => {
    setLoading(true);
    await onVote(application._id, vote);
    setLoading(false);
  };

  const approvals = application.votes?.filter((v: any) => v.vote === 'approve').length || 0;
  const rejections = application.votes?.filter((v: any) => v.vote === 'reject').length || 0;
  const totalVotes = application.votes?.length || 0;
  
  // Calculate percentage mapping teamSize (fallback to 1 if 0)
  const safeSize = teamSize > 0 ? teamSize : 1;
  const approvalPercent = (approvals / safeSize) * 100;
  
  const hasVoted = application.votes?.some((v: any) => v.voterId === currentUserId || v.voterId?._id === currentUserId);

  return (
    <div className="glass-card transform-gpu p-6 rounded-2xl border border-foreground/10 relative overflow-hidden bg-surface-hover/80 shadow-xl transition-all">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h4 className="text-xl font-bold text-foreground">{application.userId?.name || 'New Applicant'}</h4>
          <p className="text-xs text-accent bg-accent/10 px-2 py-1 rounded inline-block mt-2 font-medium">Applied for: {application.role}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
          application.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
          application.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/30' : 
          'bg-yellow-500/10 text-yellow-500 border-yellow-500/30 animate-pulse'
        }`}>
          {application.status}
        </span>
      </div>

      <div className="mb-6 bg-black/20 p-4 rounded-xl border border-foreground/5">
        <div className="flex justify-between text-xs font-semibold text-foreground/50 mb-3 tracking-wider uppercase">
          <span>Consensus Progress</span>
          <span>{approvals}/{safeSize} Required ({Math.round(approvalPercent)}%)</span>
        </div>
        <div className="w-full bg-foreground/5 rounded-full h-2.5 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-accent h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(approvalPercent, 100)}%` }}></div>
        </div>
        <div className="text-[10px] text-foreground/40 mt-3 flex flex-col gap-2">
          <div className="flex justify-between border-b border-foreground/5 pb-3 mb-2">
            <span className="text-emerald-400">✅ {approvals} Approved</span>
            <span className="text-red-400">❌ {rejections} Rejected</span>
          </div>
          <div className="flex flex-col gap-1.5 pt-1">
            <p className="text-foreground/60 mb-1 font-semibold uppercase tracking-wider text-[9px]">Team Consensus Tracker:</p>
            {application.votes?.length > 0 ? application.votes.map((v: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center bg-foreground/5 px-3 py-2 rounded-lg transition-colors hover:bg-foreground/10">
                <span className="text-foreground/80 font-medium text-xs">{v.voterId?.name || v.voterName || 'Teammate'}</span>
                <span className={`font-bold text-xs ${v.vote === 'approve' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {v.vote === 'approve' ? '✅ Approved' : '❌ Rejected'}
                </span>
              </div>
            )) : <span className="text-foreground/30 italic text-xs py-2">No votes cast yet. Be the first!</span>}
          </div>
        </div>
      </div>

      {application.status === 'pending' && !hasVoted ? (
        <div className="flex gap-3">
          <button 
            disabled={loading}
            onClick={() => handleVote('approve')}
            className="flex-1 py-3 flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:scale-[1.02] border border-emerald-500/30 rounded-xl transition-all text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)] disabled:opacity-50 disabled:hover:scale-100"
          >
            <CheckCircle size={18} /> Approve
          </button>
          <button 
            disabled={loading}
            onClick={() => handleVote('reject')}
            className="flex-1 py-3 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:scale-[1.02] border border-red-500/30 rounded-xl transition-all text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.15)] disabled:opacity-50 disabled:hover:scale-100"
          >
            <XCircle size={18} /> Reject
          </button>
        </div>
      ) : (
        <div className="text-center text-sm font-medium text-foreground/50 bg-background/50 border border-foreground/5 py-3 rounded-xl backdrop-blur-md">
          {hasVoted && application.status === 'pending' ? "⏳ Action recorded. Waiting for others..." : "Voting concluded"}
        </div>
      )}
    </div>
  );
}
