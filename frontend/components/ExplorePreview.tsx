"use client";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from './useInView';

const topUsers = [
  { id: 1, name: "Alice Builder", role: "Fullstack", availability: "Active", skills: ["React", "Node", "MongoDB"], exp: "Mid" },
  { id: 2, name: "Bob Design", role: "UI/UX", availability: "Active", skills: ["Figma", "Framer", "CSS"], exp: "Senior" },
  { id: 3, name: "Charlie DB", role: "Backend", availability: "Exploring", skills: ["Postgres", "Redis", "Go"], exp: "Junior" },
  { id: 4, name: "Dana Crypto", role: "Web3", availability: "Exploring", skills: ["Solidity", "Rust", "Ethers"], exp: "Lead" }
];

export default function ExplorePreview() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              Explore Top Talent
            </h2>
            <p className="text-lg text-foreground/50 max-w-2xl">
              Discover proven builders in the community, review their verified skill sets, and invite them to your next big idea.
            </p>
          </div>
          <Link href="/explore" className="group flex items-center gap-2 text-accent hover:text-foreground transition-colors font-semibold">
            See All Developers
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={ref}>
          {topUsers.map((user, idx) => (
            <div
              key={user.id}
              className={`anim-scale-in anim-delay-${idx + 1} glass-card p-6 flex flex-col group hover:-translate-y-2 transition-transform border border-foreground/5 hover:border-accent/30 rounded-3xl ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent/50 to-blue-500/50 flex items-center justify-center text-xl font-bold text-foreground shadow-lg shadow-accent/20">
                  {user.name[0]}
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  user.availability === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                  'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                }`}>
                  {user.availability}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{user.name}</h3>
              <p className="text-sm text-foreground/50 mb-4">{user.role} • {user.exp}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {user.skills.map(s => (
                  <span key={s} className="px-2 py-1 bg-foreground/5 border border-foreground/10 rounded-lg text-xs text-foreground/70">
                    {s}
                  </span>
                ))}
              </div>

              <Link href="/explore" className="w-full mt-6 py-2 rounded-xl text-center border border-foreground/10 bg-foreground/5 hover:bg-accent/20 hover:border-accent/50 transition-all text-sm font-bold text-foreground/80 hover:text-foreground">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
