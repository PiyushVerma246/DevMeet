"use client";
import { Search, Filter, MapPin, ArrowRight, Github, Sparkles, Briefcase, Star, Code2, Users, LayoutDashboard } from 'lucide-react';
import { useCallback, useState } from 'react';
import Link from 'next/link';

const advancedUsers = [
  { 
    id: 1, 
    name: "Alice Chen", 
    role: "Fullstack Engineer", 
    level: "Senior",
    availability: "Available", 
    skills: ["React", "Node.js", "PostgreSQL", "GraphQL"], 
    metrics: { projects: 12, rating: 4.9, commits: "2.4k" },
    github: "alicechen", 
    location: "San Francisco, CA", 
    avatar: "AC", 
    bio: "I'm a full-stack developer with 5+ years of experience building highly scalable distributed systems. Previously at Stripe. I love participating in web3 and AI hackathons. Currently looking for a squad to build a high-performance DeFi protocol.",
    lookingFor: ["UI/UX Designer", "Smart Contract Auditor"],
    gradient: "from-indigo-500 to-purple-600"
  },
  { 
    id: 2, 
    name: "Marcus Wei", 
    role: "Product Designer", 
    level: "Lead",
    availability: "Open to collaborate", 
    skills: ["Figma", "Framer", "Design Systems", "CSS"], 
    metrics: { projects: 24, rating: 5.0, commits: "N/A" },
    github: "marcuswei", 
    location: "New York, NY", 
    avatar: "MW", 
    bio: "Design lead focused on crafting beautiful, intuitive interfaces and seamless user experiences. Specializing in dark mode aesthetics and micro-animations. Want to team up with strong engineering talent to build B2B SaaS products.",
    lookingFor: ["Frontend Developer", "Backend Developer"],
    gradient: "from-pink-500 to-rose-600"
  },
  { 
    id: 3, 
    name: "Priya Patel", 
    role: "Backend Architect", 
    level: "Staff",
    availability: "Exploring", 
    skills: ["Go", "Rust", "Kubernetes", "Kafka"], 
    metrics: { projects: 8, rating: 4.7, commits: "5.1k" },
    github: "priyap", 
    location: "London, UK", 
    avatar: "PP", 
    bio: "Obsessed with microservices, low-latency systems, and performance optimization. Built trading engines and real-time streaming platforms. If you have a hardcore infra idea or a heavy data-processing startup, hit me up.",
    lookingFor: ["Product Manager", "Frontend Developer"],
    gradient: "from-emerald-500 to-teal-600"
  },
  { 
    id: 4, 
    name: "James Okafor", 
    role: "Web3 Developer", 
    level: "Mid",
    availability: "Available", 
    skills: ["Solidity", "Hardhat", "Ethers.js", "React"], 
    metrics: { projects: 5, rating: 4.8, commits: "1.2k" },
    github: "jokafor", 
    location: "Lagos, NG", 
    avatar: "JO", 
    bio: "Smart contract auditor and protocol developer. Deployed multiple secure contracts holding 7-figure TVL. I'm participating in ETHGlobal next week and currently assembling a team of 4.",
    lookingFor: ["Fullstack Engineer", "Designer"],
    gradient: "from-blue-500 to-indigo-600"
  },
  { 
    id: 5, 
    name: "Emma Larsson", 
    role: "AI Researcher", 
    level: "Senior",
    availability: "Hackathon Mode", 
    skills: ["Python", "PyTorch", "LangChain", "CUDA"], 
    metrics: { projects: 15, rating: 4.9, commits: "3.8k" },
    github: "emmal", 
    location: "Stockholm, SE", 
    avatar: "EL", 
    bio: "Fine-tuning foundational models for creative workflows. Passionate about local LLMs, agentic frameworks, and RAG architectures. Have 3 models ready to deploy for the upcoming AI hackathon.",
    lookingFor: ["Frontend Engineer", "DevOps"],
    gradient: "from-violet-500 to-purple-600"
  }
];

export default function Explore() {
  const [activeTab, setActiveTab] = useState('All');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  }, []);

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 relative min-h-screen">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Page Header */}
      <div className="mb-14">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground flex items-center gap-3">
          Talent <span className="text-gradient bg-gradient-to-r from-indigo-400 to-purple-400">Directory</span>
        </h1>
        <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed">
          The curated network of builders. Discover verified specialists based on their proof-of-work, tech stack, and hackathon availability.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 sticky top-32">
          
          {/* Search Box */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition opacity duration-500"></div>
            <div className="relative bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-2 shadow-inner">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input 
                type="text" 
                placeholder="Search skills, names..." 
                className="w-full bg-transparent border-none py-2 pl-10 pr-4 text-sm text-foreground focus:outline-none placeholder:text-foreground/30"
              />
            </div>
          </div>

          <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-2xl p-5 space-y-8">
            {/* Roles Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4 flex items-center gap-2"><LayoutDashboard size={14} /> Roles</h3>
              <div className="space-y-2">
                {['All', 'Frontend', 'Backend', 'Fullstack', 'Design', 'Web3', 'AI/ML'].map((role) => (
                  <label key={role} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${activeTab === role ? 'bg-indigo-500 border-indigo-500' : 'border-foreground/20 group-hover:border-indigo-500/50'}`}>
                      {activeTab === role && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                    </div>
                    <span className={`text-sm ${activeTab === role ? 'text-foreground font-semibold' : 'text-foreground/60 group-hover:text-foreground/90'}`} onClick={() => setActiveTab(role)}>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4 flex items-center gap-2"><Code2 size={14} /> Availability</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-9 text-[10px] py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-center font-bold">YES</div>
                  <span className="text-sm text-foreground/70 tracking-tight">Available Now</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-9 text-[10px] py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 text-center font-bold">HACK</div>
                  <span className="text-sm text-foreground/70 tracking-tight">Hackathon Mode</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="w-9 text-[10px] py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-center font-bold">OPEN</div>
                  <span className="text-sm text-foreground/70 tracking-tight">Open to collaborate</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Rich Directory List */}
        <main className="flex-1 w-full space-y-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-foreground/50 font-medium">Showing <span className="text-foreground font-bold">{advancedUsers.length}</span> top builders</p>
            <button className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              <Filter size={14} /> Sort by Relevance
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {advancedUsers.map((user, idx) => (
              <div
                key={user.id}
                onMouseMove={handleMouseMove}
                className="spotlight-card relative p-6 sm:p-8 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] hover:border-indigo-500/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col md:flex-row gap-6 md:gap-8 group anim-entrance"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Left Column: Identity & Status */}
                <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-56 md:border-r border-foreground/5 pb-6 md:pb-0 md:pr-8">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${user.gradient} mb-5 flex items-center justify-center text-3xl font-black text-white shadow-xl group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 relative`}>
                    {user.avatar}
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-indigo-400 transition-colors text-center md:text-left">{user.name}</h3>
                  <p className="text-sm font-bold text-foreground/50 mb-3 text-center md:text-left">{user.role} • <span className="text-foreground/80">{user.level}</span></p>
                  
                  <div className="flex flex-col gap-2 w-full items-center md:items-start">
                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40">
                      <MapPin size={14} className="text-foreground/30" /> {user.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40">
                      <Github size={14} className="text-foreground/30" /> {user.github}
                    </div>
                    
                    <div className="mt-2 w-full max-w-[200px]">
                      <div className={`w-full py-1.5 px-3 rounded-md text-[10px] font-bold text-center uppercase tracking-wider ${
                        user.availability === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        user.availability === 'Open to collaborate' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        user.availability === 'Hackathon Mode' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {user.availability}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Bio, Skills, Actions */}
                <div className="flex-1 flex flex-col">
                  
                  {/* Top Stats Row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      About the Builder
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 md:gap-5">
                      <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1.5 object-contain text-xs font-bold text-foreground"><Briefcase size={14} className="text-indigo-400"/> {user.metrics.projects}</span>
                        <span className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">Shipped</span>
                      </div>
                      <div className="w-px h-8 bg-foreground/10"></div>
                      <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground"><Code2 size={14} className="text-purple-400"/> {user.metrics.commits}</span>
                        <span className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">Commits</span>
                      </div>
                      <div className="w-px h-8 bg-foreground/10 hidden sm:block"></div>
                      <div className="flex flex-col items-end hidden sm:flex">
                        <span className="flex items-center gap-1 text-xs font-bold text-foreground"><Star size={14} className="text-amber-400 fill-amber-400"/> {user.metrics.rating}</span>
                        <span className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">Peer Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6 flex-1 pr-0 lg:pr-8">
                    {user.bio}
                  </p>

                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mt-auto">
                    
                    {/* Skills & Seeking */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/30 mb-2 block">Top Skills</span>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map(s => (
                            <span key={s} className="px-2.5 py-1 bg-foreground/[0.04] border border-foreground/[0.08] rounded-md text-[11px] text-foreground/80 font-semibold shadow-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/30">Seeking:</span>
                        <div className="flex flex-wrap gap-2">
                           {user.lookingFor.map(role => (
                             <span key={role} className="flex items-center gap-1 text-[11px] text-indigo-400 font-semibold">
                               <Users size={12} /> {role}
                             </span>
                           ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex w-full xl:w-auto gap-3 shrink-0">
                      <Link href={`/explore/${user.id}`} className="flex-1 xl:flex-none">
                        <button className="w-full xl:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-foreground/[0.03] border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20 text-foreground transition-all flex items-center justify-center shadow-sm">
                          View Full Profile
                        </button>
                      </Link>
                      <button className="flex-1 xl:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm group/btn">
                        <Sparkles size={14} className="group-hover/btn:animate-pulse" /> Invite to Squad
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 flex justify-center">
            <button className="px-6 py-3 rounded-full border border-foreground/10 bg-foreground/[0.02] text-sm font-semibold text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05] transition-all flex items-center gap-2">
              Load More Builders <ArrowRight size={16} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
