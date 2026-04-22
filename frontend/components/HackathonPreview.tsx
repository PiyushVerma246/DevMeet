"use client";
import { ArrowRight, Zap, Trophy, Timer } from 'lucide-react';
import Link from 'next/link';
import { useInView } from './useInView';
import { useCallback } from 'react';

const hackathonCandidates = [
  {
    id: 1,
    name: "Jin Woo Park",
    role: "Full Stack Engineer",
    avatar: "JP",
    skills: ["Next.js", "Node.js", "PostgreSQL"],
    bio: "Looking to build something ambitious in the Web3 space this weekend. Have experience shipping 3 hackathon projects.",
    targetHackathon: { name: "ETHGlobal London", daysLeft: 5 },
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "AI/ML Engineer",
    avatar: "SM",
    skills: ["Python", "PyTorch", "LangChain"],
    bio: "Have 3 fine-tuned LLM agents ready to deploy. Need a frontend developer and infra engineer to build the full product.",
    targetHackathon: { name: "OpenAI Hackathon", daysLeft: 12 },
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Smart Contract Dev",
    avatar: "ER",
    skills: ["Solidity", "Rust", "Hardhat"],
    bio: "Audited 5 DeFi protocols. Ready to build a cross-chain lending platform with yield optimization.",
    targetHackathon: { name: "ETHGlobal London", daysLeft: 5 },
    gradient: 'from-emerald-500 to-teal-600',
  }
];

export default function HackathonPreview() {
  const [ref, isVisible] = useInView();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  }, []);

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] -z-10 translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Zap size={12} className="fill-cyan-500" /> Sprint Mode
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
              Hackathon <span className="text-gradient bg-gradient-to-r from-cyan-400 to-emerald-400">Squads</span>
            </h2>
            <p className="text-base text-foreground/40 max-w-xl leading-relaxed">
              Recruit vetted specialists for weekend hackathons. Find your dream team in minutes, not days.
            </p>
          </div>
          <Link href="/hackathons" className="group flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/15">
            View Live Queue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={ref}>
          {hackathonCandidates.map((candidate, idx) => (
            <div
              key={candidate.id}
              onMouseMove={handleMouseMove}
              className={`spotlight-card anim-fade-up anim-delay-${idx + 1} relative p-7 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] hover:border-cyan-500/20 flex flex-col group overflow-hidden transition-all duration-500 ${isVisible ? 'is-visible' : ''}`}
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${candidate.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Avatar + Info */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${candidate.gradient} flex items-center justify-center text-base font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {candidate.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-foreground group-hover:text-cyan-400 transition-colors">{candidate.name}</h3>
                    <p className="text-[11px] font-medium text-foreground/30 uppercase tracking-wider mt-0.5">{candidate.role}</p>
                  </div>
                </div>

                {/* Hackathon Target */}
                <div className="flex items-center gap-2.5 bg-foreground/[0.03] border border-foreground/[0.06] p-3 rounded-xl mb-5">
                  <Trophy size={14} className="text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold text-foreground/70 flex-1">{candidate.targetHackathon.name}</span>
                  <div className="flex items-center gap-1 text-[10px] text-foreground/30">
                    <Timer size={10} /> {candidate.targetHackathon.daysLeft}d
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-foreground/40 leading-relaxed mb-6 flex-grow">
                  &ldquo;{candidate.bio}&rdquo;
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {candidate.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-foreground/[0.04] border border-foreground/[0.06] rounded-md text-[10px] text-foreground/50 font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/hackathons" className="w-full py-3 rounded-xl text-center text-xs font-bold bg-cyan-500/8 text-cyan-400 border border-cyan-500/15 hover:bg-cyan-500/15 hover:border-cyan-500/30 transition-all duration-300">
                  Recruit Specialist
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
