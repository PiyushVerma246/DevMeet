"use client";
import { ArrowRight, Zap, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useInView } from './useInView';

const hackathonCandidates = [
  { id: 1, name: "Jin Woo", role: "Full Stack Eng", avatar: "J", skills: ["Next.js", "Node", "PostgreSQL"], bio: "Looking to build something crazy in the Web3 space this weekend.", targetHackathon: { name: "ETHGlobal London" } },
  { id: 2, name: "Sophia M.", role: "AI Specialist", avatar: "S", skills: ["Python", "PyTorch", "LLMs"], bio: "Have 3 LLM agents ready to deploy. Need a frontend and infra buddy.", targetHackathon: { name: "OpenAI Spring Hack" } },
  { id: 3, name: "Elena R.", role: "Smart Contract Dev", avatar: "E", skills: ["Solidity", "Rust", "Hardhat"], bio: "Audited 5 protocols. Let's build a DeFi lending platform.", targetHackathon: { name: "ETHGlobal London" } }
];

export default function HackathonPreview() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] -z-10 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 pt-16 border-t border-foreground/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Zap size={14} className="fill-cyan-500" /> Sprint Mode
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Hackathon Squads
            </h2>
            <p className="text-lg text-foreground/50 max-w-2xl">
              Need a specialist for 48 hours? Recruit vetted builders explicitly looking for weekend hackathons right now.
            </p>
          </div>
          <Link href="/hackathons" className="group flex items-center gap-2 text-cyan-400 hover:text-foreground transition-colors font-semibold bg-cyan-500/10 px-6 py-3 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20">
            View Live Queue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={ref}>
          {hackathonCandidates.map((candidate, idx) => (
            <div
              key={candidate.id}
              className={`anim-fade-up anim-delay-${idx + 1} glass-card p-8 rounded-3xl border border-foreground/5 hover:border-cyan-500/40 flex flex-col group relative overflow-hidden ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-surface to-white/10 border border-foreground/10 flex items-center justify-center text-xl font-bold text-foreground group-hover:scale-110 transition-transform shadow-xl">
                    {candidate.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-cyan-400 transition-colors">{candidate.name}</h3>
                    <p className="text-xs font-semibold text-emerald-400/80 uppercase tracking-widest mt-1">{candidate.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-foreground/5 border border-foreground/10 p-3 rounded-xl mb-6 shadow-inner w-max">
                <Trophy size={14} className="text-teal-400" />
                <span className="text-xs font-semibold text-foreground/90">{candidate.targetHackathon.name}</span>
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed italic border-l-2 border-foreground/10 pl-4 mb-8 flex-grow">
                &quot;{candidate.bio}&quot;
              </p>

              <Link href="/hackathons" className="w-full py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl text-center text-sm font-bold hover:bg-cyan-500 hover:text-foreground transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                Recruit Specialist
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
