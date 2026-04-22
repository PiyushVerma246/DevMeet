"use client";
import { ArrowRight, Github, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useInView } from './useInView';
import { useRef, useCallback } from 'react';

const topUsers = [
  { id: 1, name: "Alice Chen", role: "Fullstack Engineer", availability: "Open to collaborate", skills: ["React", "Node.js", "PostgreSQL"], exp: "Senior", github: "alicechen", location: "SF, CA", avatar: "AC" },
  { id: 2, name: "Marcus Wei", role: "UI/UX Designer", availability: "Available", skills: ["Figma", "Framer", "Tailwind"], exp: "Lead", github: "marcuswei", location: "NYC, NY", avatar: "MW" },
  { id: 3, name: "Priya Patel", role: "Backend Engineer", availability: "Exploring", skills: ["Go", "Redis", "Kubernetes"], exp: "Senior", github: "priyap", location: "London, UK", avatar: "PP" },
  { id: 4, name: "James Okafor", role: "Web3 Developer", availability: "Available", skills: ["Solidity", "Rust", "Ethers.js"], exp: "Mid", github: "jokafor", location: "Lagos, NG", avatar: "JO" }
];

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-purple-500 to-pink-600',
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-600',
];

export default function ExplorePreview() {
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
    <section className="py-28 relative">
      {/* Section glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] -z-10 -translate-y-1/2" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Community
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400">Top Builders</span>
            </h2>
            <p className="text-base text-foreground/40 max-w-xl leading-relaxed">
              Discover proven developers with verified portfolios. Review their skills and invite them to your next project.
            </p>
          </div>
          <Link href="/explore" className="group flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors px-5 py-2.5 rounded-full border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5">
            See All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" ref={ref}>
          {topUsers.map((user, idx) => (
            <div
              key={user.id}
              onMouseMove={handleMouseMove}
              className={`spotlight-card anim-fade-up anim-delay-${idx + 1} relative p-6 flex flex-col group rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'is-visible' : ''}`}
            >
              {/* Spotlight */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Avatar + Status */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[idx]} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                    {user.avatar}
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full ${
                    user.availability === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    user.availability === 'Open to collaborate' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {user.availability}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-base font-bold text-foreground group-hover:text-purple-400 transition-colors">{user.name}</h3>
                <p className="text-xs text-foreground/40 mb-1">{user.role} · {user.exp}</p>
                <div className="flex items-center gap-1 text-[10px] text-foreground/25 mb-4">
                  <MapPin size={10} /> {user.location}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                  {user.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-foreground/[0.04] border border-foreground/[0.06] rounded-md text-[10px] text-foreground/50 font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <Link
                  href="/explore"
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-purple-500/10 hover:border-purple-500/20 hover:text-purple-400 transition-all"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
