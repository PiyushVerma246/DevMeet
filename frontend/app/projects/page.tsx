"use client";
import {
  Plus, Search, Filter, Rocket, Code2, Zap, Globe, Brain, Palette,
  Users, Clock, ArrowRight, Star, GitBranch, Flame, BookOpen,
  ChevronRight, X, CheckCircle, Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ProjectCardSkeleton } from '@/components/Skeleton';

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Quantum Trade',
    tagline: 'Next-gen AI-powered DeFi exchange on Solana.',
    desc: 'Building a decentralized exchange that leverages real-time AI models for smarter trade routing, MEV protection, and auto-rebalancing liquidity pools.',
    members: 2, size: 4,
    roles: ['Frontend Dev', 'Solidity Eng'],
    tags: ['Web3', 'DeFi', 'AI'],
    stack: ['Solidity', 'React', 'Rust', 'Solana'],
    category: 'Web3',
    hackathon: false,
    hot: true,
    daysAgo: 2,
    gradient: 'from-indigo-500 to-purple-600',
    accentColor: 'indigo',
  },
  {
    id: 2,
    title: 'Nova AI Agent',
    tagline: 'Your AI-native terminal co-pilot.',
    desc: 'Building a personalized terminal assistant powered by a fine-tuned LLM that understands your codebase, automates repetitive tasks, and pairs with your IDE.',
    members: 1, size: 3,
    roles: ['Backend Eng', 'AI Eng'],
    tags: ['AI', 'CLI', 'LLM'],
    stack: ['Python', 'Go', 'LangChain', 'OpenAI'],
    category: 'AI',
    hackathon: true,
    hot: true,
    daysAgo: 1,
    gradient: 'from-violet-500 to-purple-600',
    accentColor: 'violet',
  },
  {
    id: 3,
    title: 'Aura UI Library',
    tagline: 'Delightful animation primitives for the web.',
    desc: 'An open-source component library with physics-based micro-animations, dark-mode-first design tokens, and zero dependency on Framer.',
    members: 3, size: 4,
    roles: ['UI/UX Designer'],
    tags: ['React', 'CSS', 'Open Source'],
    stack: ['React', 'TypeScript', 'CSS', 'Storybook'],
    category: 'Design',
    hackathon: false,
    hot: false,
    daysAgo: 7,
    gradient: 'from-pink-500 to-rose-600',
    accentColor: 'pink',
  },
  {
    id: 4,
    title: 'FocusFlow',
    tagline: 'AI task manager for neurodivergent builders.',
    desc: 'A minimalist productivity app with AI-powered task decomposition, gentle nudges, and a distraction-free mode tailored for ADHD and autistic users.',
    members: 2, size: 5,
    roles: ['Frontend Dev', 'Mobile Dev', 'PM'],
    tags: ['AI', 'Productivity', 'Mobile'],
    stack: ['Next.js', 'React Native', 'OpenAI', 'Supabase'],
    category: 'AI',
    hackathon: false,
    hot: false,
    daysAgo: 5,
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
  },
  {
    id: 5,
    title: 'ChainDocs',
    tagline: 'On-chain document verification protocol.',
    desc: 'Decentralized document signing and notarization using zero-knowledge proofs. Immutable audit trails for contracts, degrees, and certificates.',
    members: 1, size: 3,
    roles: ['ZK Engineer', 'Smart Contract Dev'],
    tags: ['Web3', 'ZK', 'Privacy'],
    stack: ['Solidity', 'Circom', 'Rust', 'Hardhat'],
    category: 'Web3',
    hackathon: true,
    hot: true,
    daysAgo: 3,
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
  },
  {
    id: 6,
    title: 'GridWorld',
    tagline: 'Massively multiplayer browser strategy game.',
    desc: 'A real-time WebSocket strategy game with a procedurally generated world, guild mechanics, and NFT-based land ownership for a persistent economy.',
    members: 3, size: 6,
    roles: ['Game Dev', 'Backend Eng', 'Artist'],
    tags: ['Gaming', 'Web3', 'WebSockets'],
    stack: ['Three.js', 'Go', 'Redis', 'Solidity'],
    category: 'Gaming',
    hackathon: false,
    hot: false,
    daysAgo: 10,
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
  },
];

const CATEGORIES = [
  { id: 'All', label: 'All Projects', icon: <Globe size={14} /> },
  { id: 'AI', label: 'AI / ML', icon: <Brain size={14} /> },
  { id: 'Web3', label: 'Web3', icon: <Zap size={14} /> },
  { id: 'Design', label: 'Design', icon: <Palette size={14} /> },
  { id: 'Gaming', label: 'Gaming', icon: <Rocket size={14} /> },
];

const SORT_OPTIONS = ['Newest', 'Hot 🔥', 'Most Open Spots', 'Alphabetical'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20',
  pink:   'bg-pink-500/10   text-pink-400   border-pink-500/20   hover:bg-pink-500/20',
  emerald:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
  cyan:   'bg-cyan-500/10   text-cyan-400   border-cyan-500/20   hover:bg-cyan-500/20',
  amber:  'bg-amber-500/10  text-amber-400  border-amber-500/20  hover:bg-amber-500/20',
};
const glowMap: Record<string, string> = {
  indigo: 'hover:shadow-indigo-500/10 hover:border-indigo-500/30',
  violet: 'hover:shadow-violet-500/10 hover:border-violet-500/30',
  pink:   'hover:shadow-pink-500/10   hover:border-pink-500/30',
  emerald:'hover:shadow-emerald-500/10 hover:border-emerald-500/30',
  cyan:   'hover:shadow-cyan-500/10   hover:border-cyan-500/30',
  amber:  'hover:shadow-amber-500/10  hover:border-amber-500/30',
};

// ─── ProjectCard ─────────────────────────────────────────────────────────────
function ProjectCard({ proj, idx }: { proj: typeof PROJECTS[0]; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied]   = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const fillPct = (proj.members / proj.size) * 100;
  const openSpots = proj.size - proj.members;
  const accent = colorMap[proj.accentColor] ?? colorMap.indigo;
  const glow   = glowMap[proj.accentColor]  ?? glowMap.indigo;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--y', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card group relative flex flex-col rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02]
        transition-all duration-500 overflow-hidden cursor-pointer
        hover:shadow-2xl hover:-translate-y-1 ${glow}
        ${expanded ? 'ring-1 ring-foreground/10' : ''}
      `}
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      {/* ── Top accent line ── */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${proj.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* ── Hackathon badge ── */}
      {proj.hackathon && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-pink-500/15 text-pink-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-pink-500/25">
          <Zap size={10} className="fill-pink-400" /> HACKATHON
        </div>
      )}

      {/* ── Hot badge ── */}
      {proj.hot && !proj.hackathon && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-amber-500/15 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/25">
          <Flame size={10} className="fill-amber-400" /> HOT
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* ── Header row ── */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${proj.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <Code2 size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-lg font-black text-foreground tracking-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-all">
              {proj.title}
            </h3>
            <p className="text-xs text-foreground/40 mt-0.5 truncate">{proj.tagline}</p>
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-1.5">
          {proj.tags.map(t => (
            <span key={t} className="px-2 py-0.5 bg-foreground/[0.04] border border-foreground/[0.07] rounded-md text-[10px] text-foreground/50 font-semibold">
              {t}
            </span>
          ))}
        </div>

        {/* ── Description ── */}
        <p className={`text-sm text-foreground/50 leading-relaxed transition-all duration-300 ${expanded ? '' : 'line-clamp-2'}`}>
          {proj.desc}
        </p>

        {/* ── Team progress ── */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider">Team Progress</span>
            <span className="text-[11px] font-bold text-foreground/60">{proj.members}/{proj.size} filled</span>
          </div>
          <div className="w-full h-1.5 bg-foreground/[0.06] rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${proj.gradient} rounded-full transition-all duration-1000`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
          <p className="text-[10px] text-foreground/30 mt-1">
            {openSpots} open {openSpots === 1 ? 'spot' : 'spots'} remaining
          </p>
        </div>

        {/* ── Roles Needed ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-2">Roles Needed</p>
          <div className="flex flex-wrap gap-1.5">
            {proj.roles.map(r => (
              <span key={r} className={`px-2.5 py-1 border rounded-lg text-[11px] font-semibold transition-colors ${accent}`}>
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* ── Expandable details ── */}
        {expanded && (
          <div className="pt-4 border-t border-foreground/[0.06] flex flex-col gap-3 animate-[fade-in_0.2s_ease]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-foreground/[0.05] border border-foreground/[0.08] rounded-lg text-[11px] text-foreground/60 font-medium font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/40">
              <Clock size={12} />
              Posted {proj.daysAgo} {proj.daysAgo === 1 ? 'day' : 'days'} ago
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-6 pb-6 flex items-center gap-3 mt-auto">
        {/* Expand / collapse */}
        <button
          onClick={() => setExpanded(p => !p)}
          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/40 hover:text-foreground/80 transition-colors"
        >
          <BookOpen size={13} />
          {expanded ? 'Less' : 'Details'}
          <ChevronRight size={12} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} />
        </button>

        <div className="flex-1" />

        {/* Apply CTA */}
        <button
          onClick={() => setApplied(p => !p)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
            applied
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : `bg-gradient-to-r ${proj.gradient} text-white shadow-lg hover:scale-105 hover:shadow-xl`
          }`}
        >
          {applied ? <><CheckCircle size={13} /> Applied!</> : <>Apply to Join <ArrowRight size={13} /></>}
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [loading, setLoading]       = useState(true);
  const [query, setQuery]           = useState('');
  const [category, setCategory]     = useState('All');
  const [sort, setSort]             = useState('Newest');
  const [hackathonOnly, setHOnly]   = useState(false);
  const [openSpotsOnly, setOSOnly]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = PROJECTS
    .filter(p => {
      const q = query.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)) || p.roles.some(r => r.toLowerCase().includes(q)) || p.stack.some(s => s.toLowerCase().includes(q));
      const matchCat = category === 'All' || p.category === category;
      const matchH = !hackathonOnly || p.hackathon;
      const matchOS = !openSpotsOnly || p.members < p.size;
      return matchQ && matchCat && matchH && matchOS;
    })
    .sort((a, b) => {
      if (sort === 'Hot 🔥')           return (b.hot ? 1 : 0) - (a.hot ? 1 : 0);
      if (sort === 'Most Open Spots')  return (b.size - b.members) - (a.size - a.members);
      if (sort === 'Alphabetical')     return a.title.localeCompare(b.title);
      return a.daysAgo - b.daysAgo; // Newest
    });

  const hasFilters = query || category !== 'All' || hackathonOnly || openSpotsOnly;

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[180px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">

        {/* ── Page header ── */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            <GitBranch size={13} /> Projects Radar
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-3">
                Find your next{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  rocket ship
                </span>
              </h1>
              <p className="text-foreground/40 text-lg max-w-xl leading-relaxed">
                Join open projects recruiting right now, or post your own idea and let builders come to you.
              </p>
            </div>
            <Link href="/projects/new">
              <button className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full shadow-lg shadow-indigo-500/25 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 shrink-0 text-sm">
                <Plus size={18} /> Post a Project
              </button>
            </Link>
          </div>
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={17} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title, role, tag, or tech stack…"
              className="w-full bg-foreground/[0.03] border border-foreground/[0.08] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-foreground focus:outline-none focus:border-indigo-500/40 focus:bg-foreground/[0.04] placeholder:text-foreground/25 transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/70 transition-colors">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" size={15} />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="appearance-none bg-foreground/[0.03] border border-foreground/[0.08] rounded-2xl py-3.5 pl-10 pr-10 text-sm text-foreground focus:outline-none focus:border-indigo-500/40 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* ── Category pills + Toggles ── */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                category === c.id
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-foreground/[0.04] text-foreground/50 hover:bg-foreground/[0.08] hover:text-foreground/80 border border-foreground/[0.07]'
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <Toggle active={hackathonOnly} onToggle={() => setHOnly(p => !p)} icon={<Zap size={12} />} label="Hackathon" color="pink" />
            <Toggle active={openSpotsOnly} onToggle={() => setOSOnly(p => !p)} icon={<Users size={12} />} label="Open Spots" color="emerald" />
          </div>
        </div>

        {/* ── Results meta ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-foreground/40">
            Showing <span className="text-foreground font-bold">{filtered.length}</span> projects
            {hasFilters && (
              <button onClick={() => { setQuery(''); setCategory('All'); setHOnly(false); setOSOnly(false); }} className="ml-3 text-indigo-400 hover:text-indigo-300 font-semibold text-xs underline underline-offset-2">
                Clear filters
              </button>
            )}
          </p>
          <div className="flex items-center gap-2 text-xs text-foreground/30">
            <Briefcase size={13} />
            {PROJECTS.reduce((s, p) => s + (p.size - p.members), 0)} open roles total
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
            : filtered.length > 0
              ? filtered.map((p, i) => <ProjectCard key={p.id} proj={p} idx={i} />)
              : (
                <div className="col-span-full flex flex-col items-center py-24 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center text-foreground/20">
                    <Search size={28} />
                  </div>
                  <p className="text-foreground/40 font-semibold text-lg">No projects match your filters</p>
                  <p className="text-foreground/25 text-sm">Try adjusting your search or clearing filters</p>
                  <button
                    onClick={() => { setQuery(''); setCategory('All'); setHOnly(false); setOSOnly(false); }}
                    className="mt-2 px-5 py-2 rounded-full border border-foreground/10 text-sm font-semibold text-foreground/50 hover:text-foreground hover:border-foreground/20 transition-all"
                  >
                    Reset filters
                  </button>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}

// ─── Toggle chip ─────────────────────────────────────────────────────────────
function Toggle({ active, onToggle, icon, label, color }: {
  active: boolean; onToggle: () => void;
  icon: React.ReactNode; label: string; color: 'pink' | 'emerald';
}) {
  const cols = {
    pink:    { on: 'bg-pink-500/15 text-pink-400 border-pink-500/25',    off: 'bg-foreground/[0.04] text-foreground/40 border-foreground/[0.07]' },
    emerald: { on: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', off: 'bg-foreground/[0.04] text-foreground/40 border-foreground/[0.07]' },
  };
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-bold transition-all duration-200 ${active ? cols[color].on : cols[color].off}`}
    >
      {icon} {label}
    </button>
  );
}
