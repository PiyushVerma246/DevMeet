import { Search, Filter } from 'lucide-react';

const mockUsers = [
  { id: 1, name: "Alice Builder", role: "Fullstack", availability: "Hackathon Mode", skills: ["React", "Node", "MongoDB"], exp: "Mid" },
  { id: 2, name: "Bob Design", role: "UI/UX", availability: "Active", skills: ["Figma", "Framer", "CSS"], exp: "Senior" },
  { id: 3, name: "Charlie DB", role: "Backend", availability: "Exploring", skills: ["Postgres", "Redis", "Go"], exp: "Junior" },
  { id: 4, name: "Dana Crypto", role: "Web3", availability: "Busy", skills: ["Solidity", "Rust", "Ethers"], exp: "Lead" }
];

export default function Explore() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6 relative min-h-screen">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Explore Builders</h1>
          <p className="text-white/50">Find top talent and form your ultimate team.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search skills, roles or names..." 
              className="w-full bg-surface border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="p-3 bg-surface border border-white/10 rounded-full hover:bg-white/5 transition-colors">
            <Filter size={18} className="text-white/70" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockUsers.map(user => (
          <div key={user.id} className="glass-card p-6 flex flex-col group hover:-translate-y-2 transition-transform">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary/50 to-accent/50 flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(109,40,217,0.3)]">
                {user.name[0]}
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                user.availability === 'Hackathon Mode' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 
                user.availability === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                user.availability === 'Exploring' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                'bg-slate-500/20 text-slate-400 border border-slate-500/30'
              }`}>
                {user.availability}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white group-hover:neon-text transition-colors">{user.name}</h3>
            <p className="text-sm text-white/50 mb-4">{user.role} • {user.exp}</p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {user.skills.map(s => (
                <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded max-w-max text-xs text-white/70">
                  {s}
                </span>
              ))}
            </div>

            <button className="w-full mt-6 py-2 rounded border border-white/10 bg-white/5 hover:bg-primary hover:border-primary transition-all text-sm font-medium">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
