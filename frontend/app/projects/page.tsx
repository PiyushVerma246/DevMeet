import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

const mockProjects = [
  { id: 1, title: "Quantum Trade", desc: "A decentralized exchange leveraging AI for smarter trades.", members: 2, size: 4, roles: ["Frontend", "Solidity"], tags: ["Web3", "Defi"], hackathon: false },
  { id: 2, title: "Nova AI Agent", desc: "Building a personalized terminal assistant.", members: 1, size: 3, roles: ["Backend", "AI Eng"], tags: ["AI", "CLI"], hackathon: true },
  { id: 3, title: "Aura UI Library", desc: "A set of framer motion components for next-gen sites.", members: 3, size: 4, roles: ["UI/UX Designer"], tags: ["React", "CSS"], hackathon: false }
];

export default function Projects() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6 relative min-h-screen">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Projects Radar</h1>
          <p className="text-white/50">Hop onto existing rockets or start your own.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link href="/projects/new">
            <button className="px-5 py-3 bg-white text-black hover:bg-white/90 font-semibold rounded-full transition-all flex items-center gap-2 text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Plus size={18} /> New Project
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map(proj => (
          <div key={proj.id} className="glass-card p-6 flex flex-col group relative overflow-hidden">
            {proj.hackathon && (
              <div className="absolute top-0 right-0 bg-pink-500/20 text-pink-400 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-pink-500/30">
                HACKATHON
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2 mt-2">{proj.title}</h3>
            <p className="text-sm text-white/60 mb-6 flex-1">{proj.desc}</p>
            
            <div className="mb-4">
              <p className="text-xs font-semibold text-white/40 uppercase mb-2">Roles Needed</p>
              <div className="flex flex-wrap gap-2">
                {proj.roles.map(r => (
                  <span key={r} className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-xs text-accent font-medium">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/50 border border-background"></div>
                  <div className="w-8 h-8 rounded-full bg-accent/50 border border-background"></div>
                </div>
                <span className="text-xs text-white/50">{proj.members}/{proj.size} filled</span>
              </div>
              <Link href={`/projects/${proj.id}`} className="text-sm font-semibold text-white hover:text-accent transition-colors flex items-center gap-1">
                View & Join &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
