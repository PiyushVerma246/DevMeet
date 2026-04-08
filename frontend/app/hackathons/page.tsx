"use client";

import { useState } from 'react';
import { Search, Zap, Trophy, Plus, X } from 'lucide-react';
import Link from 'next/link';

const defaultCandidates = [
  { id: 1, name: "Jin Woo", role: "Full Stack Eng", avatar: "J", skills: ["Next.js", "Node", "PostgreSQL"], available: true, bio: "Looking to build something crazy in the Web3 space this weekend.", targetHackathon: { name: "ETHGlobal London", url: "/hackathons/ethglobal-london" } },
  { id: 2, name: "Sophia M.", role: "AI Specialist", avatar: "S", skills: ["Python", "PyTorch", "LLMs"], available: true, bio: "Have 3 LLM agents ready to deploy. Need a frontend and infra buddy.", targetHackathon: { name: "OpenAI Spring Hack", url: "/hackathons/openai-spring" } },
  { id: 3, name: "David K.", role: "UX/UI Designer", avatar: "D", skills: ["Figma", "Framer", "CSS"], available: true, bio: "I make apps look like they raised $5M. Let's win the design track.", targetHackathon: { name: "Vercel Ship 2026", url: "/hackathons/vercel-ship" } },
  { id: 4, name: "Elena R.", role: "Smart Contract Dev", avatar: "E", skills: ["Solidity", "Rust", "Hardhat"], available: true, bio: "Audited 5 protocols. Let's build a DeFi lending platform.", targetHackathon: { name: "ETHGlobal London", url: "/hackathons/ethglobal-london" } },
  { id: 5, name: "Marcus T.", role: "Mobile Dev", avatar: "M", skills: ["React Native", "Swift", "Firebase"], available: true, bio: "Can ship an iOS app end-to-end in 48 hours.", targetHackathon: { name: "Apple Swift Student", url: "/hackathons/swift-challenge" } },
  { id: 6, name: "Aisha F.", role: "Backend Engineer", avatar: "A", skills: ["Go", "Docker", "AWS"], available: true, bio: "I handle the infrastructure so you don't have to.", targetHackathon: { name: "AWS Serverless Hack", url: "/hackathons/aws-serverless" } },
];

const categories = ["All", "Frontend", "Backend", "AI", "Web3", "Design"];

export default function HackathonFinder() {
  const [candidates, setCandidates] = useState(defaultCandidates);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "You",
    role: "Full Stack Eng",
    skills: "React, Tailwind, Node.js",
    bio: "I am ready to build and win! Let's team up.",
    hackathonName: "ETHGlobal London",
  });

  const filteredCandidates = candidates.filter(c => {
    const matchesCategory = activeCategory === "All" || c.role.includes(activeCategory) || c.skills.some(s => s.includes(activeCategory));
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleJoinQueue = (e: React.FormEvent) => {
    e.preventDefault();
    const newCandidate = {
      id: Date.now(),
      name: formData.name,
      role: formData.role,
      avatar: formData.name.charAt(0).toUpperCase(),
      skills: formData.skills.split(',').map(s => s.trim()),
      available: true,
      bio: formData.bio,
      targetHackathon: { name: formData.hackathonName, url: "#" }
    };
    
    // Add to top of the queue
    setCandidates([newCandidate, ...candidates]);
    setShowModal(false);
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 relative min-h-screen">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      {/* Join Queue Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pt-24 overflow-y-auto">
          <div className="glass-card w-full max-w-md p-8 rounded-3xl relative border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.1)] my-auto max-h-[85vh] overflow-y-auto">
            <button 
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors border border-white/10 rounded-full p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
            >
              <X size={16} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-2 pt-2">Join the Queue</h2>
            <p className="text-sm text-white/60 mb-6">Let teams know you are actively looking for a hackathon squad.</p>
            
            <form onSubmit={handleJoinQueue} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Your Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50" required />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Primary Role</label>
                <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50" required />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Skills (comma separated)</label>
                <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50" required />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Target Hackathon</label>
                <input type="text" value={formData.hackathonName} onChange={e => setFormData({...formData, hackathonName: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50" required />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Elevator Pitch (Bio)</label>
                <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500/50 h-24 resize-none" required />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="w-1/3 py-4 bg-white/5 text-white/70 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-4 bg-pink-500 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:bg-pink-600 transition-colors">
                  Add Me
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Zap size={14} className="fill-pink-500" /> Sprint Mode
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-accent">Hackathon Squad</span>
        </h1>
        <p className="text-lg text-white/50 leading-relaxed mb-8">
          These builders are explicitly looking to team up for upcoming weekend hackathons. 
          Filter by required skills and recruit them before someone else does.
        </p>

        <button 
          onClick={() => setShowModal(true)}
          className="mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-white/10 rounded-full text-white font-semibold transition-all shadow-lg shadow-pink-500/5"
        >
          <Plus size={20} className="text-pink-400" /> List Yourself in the Queue
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 glass-card p-4 rounded-2xl transform-gpu border border-white/5 shadow-xl bg-surface-hover/50">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-white text-black shadow-lg scale-105' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills or names..." 
            className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-pink-500/50 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCandidates.map(candidate => (
          <div key={candidate.id} className="glass-card p-8 rounded-3xl transform-gpu border border-white/5 hover:border-pink-500/30 group flex flex-col h-full relative overflow-hidden bg-surface-hover/30 shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] hover:-translate-y-1">
            {/* Glowing accent top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-surface to-white/10 border border-white/10 flex items-center justify-center text-2xl font-bold shadow-xl text-white group-hover:scale-110 transition-transform duration-300">
                    {candidate.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-[#0a0a0f] rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-pink-400 transition-colors">{candidate.name}</h3>
                  <p className="text-xs font-semibold text-accent/80 uppercase tracking-wider mt-1">{candidate.role}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl mb-6 shadow-inner">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-yellow-500" />
                <span className="text-xs font-semibold text-white/90">{candidate.targetHackathon.name}</span>
              </div>
              <Link href={candidate.targetHackathon.url} className="text-[10px] uppercase font-extrabold text-pink-400 hover:text-pink-300 transition-colors">
                Specs &rarr;
              </Link>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-8 flex-grow italic bg-white/5 p-4 rounded-xl border border-white/5 relative">
              <span className="absolute -top-2 -left-2 text-2xl text-pink-500/20">"</span>
              {candidate.bio}
              <span className="absolute -bottom-4 -right-2 text-2xl text-pink-500/20">"</span>
            </p>

            <div className="mb-8">
              <h4 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-3">Top Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white/80 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-3">
              <button className="w-full py-4 bg-pink-500/10 text-pink-500 border border-pink-500/30 rounded-xl text-sm font-bold hover:bg-pink-500/20 transition-all flex items-center justify-center gap-2 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                <Zap size={18} className="transition-colors group-hover:fill-white" /> Invite to Team
              </button>
            </div>
          </div>
        ))}
        {filteredCandidates.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-white/40">
            No candidates match your filters. Be the first to join this category!
          </div>
        )}
      </div>
    </div>
  );
}
