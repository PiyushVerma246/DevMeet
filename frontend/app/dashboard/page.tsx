"use client";
import { Activity, Bell, Rocket, MessageSquare, Users2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import VotingCard from '@/components/VotingCard';

export default function Dashboard() {
  const [mockApplication, setMockApplication] = useState({
    _id: "app_123",
    userId: { name: "Mark Zuckerberg" },
    role: "Frontend Dev",
    status: "pending",
    votes: [
      { voterId: { name: "Sarah Connor" }, voterName: "Sarah Connor", vote: "approve" }
    ],
    currentUserId: "my_id"
  });

  const handleVote = async (appId: string, vote: 'approve' | 'reject') => {
    await new Promise(r => setTimeout(r, 600)); // Simulating API latency
    setMockApplication(prev => {
      const newVotes = [...prev.votes, { voterId: { name: "You" }, voterName: "You", vote }];
      const approvals = newVotes.filter(v => v.vote === 'approve').length;
      const rejections = newVotes.filter(v => v.vote === 'reject').length;
      
      let newStatus = prev.status;
      if (approvals >= 2) newStatus = "accepted"; // >= 2 out of 3 = ~66% > 50%
      if (rejections >= 2) newStatus = "rejected";
      
      return { ...prev, votes: newVotes, status: newStatus };
    });
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 relative min-h-screen">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Dashboard</h1>
          <p className="text-white/50">Welcome back! Here's your personalized hub.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <Activity className="text-accent" size={20} /> Build in Public Activity
            </h3>
            
            <div className="flex gap-4 border-b border-white/5 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500/50 to-primary/50 text-white font-bold flex items-center justify-center">
                S
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">Sarah Connor <span className="text-white/40 font-normal">pushed 5 commits to</span> Project Skynet</p>
                <p className="text-xs text-white/40 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex gap-4 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500/50 to-accent/50 text-white font-bold flex items-center justify-center">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">Alan Turing <span className="text-white/40 font-normal">released v2.0 of</span> Enigma Core</p>
                <div className="mt-2 text-sm text-white/70 bg-surface border border-white/10 rounded-lg p-3">
                  "Just finished implementing the new encryption layer. The websocket system is 10x faster now."
                </div>
                <p className="text-xs text-white/40 mt-3">5 hours ago</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Rocket className="text-primary" size={20} /> Your Active Projects
            </h3>
            <Link href="/projects/1/room">
              <div className="p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/30 transition-colors flex justify-between items-center cursor-pointer group">
                <div>
                  <h4 className="font-semibold text-white group-hover:neon-text transition-colors">Quantum Trade Engine</h4>
                  <p className="text-xs text-white/50 mt-1">Role: Senior Backend Engineer</p>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  Enter Room &rarr;
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Users2 className="text-emerald-500" size={20} /> Team Applications
            </h3>
            <div className="flex flex-col gap-4">
              <VotingCard 
                application={mockApplication} 
                teamSize={3} 
                onVote={handleVote} 
                currentUserId="my_id" 
              />
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <MessageSquare className="text-blue-500" size={20} /> Suggested Mates
            </h3>
            <p className="text-xs text-white/50 mb-4">AI matched based on your missing project roles.</p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-white/5 mb-2 hover:border-white/20 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]">L</div>
                <div>
                  <p className="text-sm font-medium text-white">Linus T.</p>
                  <p className="text-[10px] text-white/40">SysAdmin • Expert</p>
                </div>
              </div>
              <span className="text-xs text-accent bg-accent/10 py-1 px-2 rounded font-medium">98% Match</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
