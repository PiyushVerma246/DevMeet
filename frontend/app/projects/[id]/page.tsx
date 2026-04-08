"use client";

import { ArrowLeft, Users, Tag, Target, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mockProjects = [
  { id: 1, title: "Quantum Trade", desc: "A decentralized exchange leveraging AI for smarter trades. We are looking to build a blazing fast AMM.", members: 2, size: 4, roles: ["Frontend", "Solidity"], tags: ["Web3", "Defi"], hackathon: false },
  { id: 2, title: "Nova AI Agent", desc: "Building a personalized terminal assistant using LLMs to read your filesystem.", members: 1, size: 3, roles: ["Backend", "AI Eng"], tags: ["AI", "CLI"], hackathon: true },
  { id: 3, title: "Aura UI Library", desc: "A set of framer motion components for next-gen sites. Needs beautiful interactions.", members: 3, size: 4, roles: ["UI/UX Designer"], tags: ["React", "CSS"], hackathon: false }
];

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = mockProjects.find(p => p.id.toString() === params.id) || mockProjects[0];
  const [hasApplied, setHasApplied] = useState(false);

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 relative min-h-screen">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] -z-10" />

      <Link href="/projects" className="text-white/50 hover:text-white flex items-center gap-2 mb-8 transition-colors w-fit">
        <ArrowLeft size={18} /> Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               {project.hackathon && (
                <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-3 py-1 rounded-full border border-pink-500/30">
                  HACKATHON
                </span>
              )}
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">{project.title}</h1>
            <p className="text-xl text-white/60 leading-relaxed">
              {project.desc}
            </p>
          </div>

          <div className="glass-card p-8 bg-surface-hover/50 rounded-[2rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target size={20} className="text-primary" /> Project Overview
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              We're building the future of our industry and we need passionate builders. 
              The infrastructure is partially set up, and we're looking for specialists to 
              help us cross the finish line before the upcoming sprint deadline.
            </p>

            <h4 className="text-sm font-semibold text-white/40 uppercase mb-4 mt-8 tracking-wider">Required Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 transition-colors hover:bg-white/10">
                  <Tag size={14} className="text-white/40" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[2rem] relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-[60px] -z-10" />
            
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <Users size={18} className="text-accent" /> Team Status
            </h3>
            
            <div className="text-4xl font-extrabold text-white flex items-baseline gap-2 mb-3">
              {project.members} <span className="text-base font-medium text-white/40">/ {project.size} Filled</span>
            </div>
            
            <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full" 
                style={{ width: `${(project.members / project.size) * 100}%` }}
              ></div>
            </div>

            <h4 className="text-sm font-semibold text-white/40 uppercase mb-4 tracking-wider">Roles Searching For</h4>
            <div className="flex flex-col gap-3 mb-10">
              {project.roles.map(role => (
                <div key={role} className="p-4 bg-accent/5 border border-accent/20 rounded-xl text-sm font-semibold text-accent flex justify-between items-center transition-all hover:bg-accent/10">
                  {role}
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setHasApplied(true)}
              disabled={hasApplied}
              className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                hasApplied 
                  ? "bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed"
                  : "bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              }`}
            >
              {hasApplied ? (
                <><CheckCircle2 size={20} /> Application Sent!</>
              ) : (
                <><Zap size={20} className="fill-black" /> Apply to Join</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
