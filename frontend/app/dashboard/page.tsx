"use client";
import {
  Activity, Rocket, MessageSquare, Users2,
  GitBranch, Zap, Trophy, Clock, Star,
  CheckCircle2, XCircle, Hourglass, ArrowRight,
  Code2, Flame, Plus, ExternalLink, FolderGit2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import VotingCard from '@/components/VotingCard';

// ─── Mock data ────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Projects Joined', value: 3, icon: <FolderGit2 size={16} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { label: 'Hackathons Won', value: 1, icon: <Trophy size={16} />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'Contributions', value: 142, icon: <GitBranch size={16} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Reputation', value: 890, icon: <Star size={16} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const ACTIVITY = [
  {
    id: 1, avatar: 'SC', color: 'from-pink-500/60 to-indigo-500/60',
    text: <><span className="font-semibold text-foreground/90">Sarah Connor</span><span className="text-foreground/40"> pushed 5 commits to </span><span className="font-semibold text-indigo-400">Quantum Trade Engine</span></>,
    sub: '2 hours ago', tag: 'commit', tagColor: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    id: 2, avatar: 'AT', color: 'from-emerald-500/60 to-teal-500/60',
    text: <><span className="font-semibold text-foreground/90">Alan Turing</span><span className="text-foreground/40"> released </span><span className="font-semibold text-emerald-400">v2.0 of Enigma Core</span></>,
    sub: '5 hours ago', tag: 'release', tagColor: 'bg-emerald-500/10 text-emerald-400',
    note: '"The websocket layer is now 10× faster."',
  },
  {
    id: 3, avatar: 'JP', color: 'from-violet-500/60 to-purple-500/60',
    text: <><span className="font-semibold text-foreground/90">Jin Park</span><span className="text-foreground/40"> opened a </span><span className="font-semibold text-violet-400">PR: Add auth middleware</span></>,
    sub: 'Yesterday', tag: 'PR', tagColor: 'bg-violet-500/10 text-violet-400',
  },
  {
    id: 4, avatar: 'ME', color: 'from-amber-500/60 to-orange-500/60',
    text: <><span className="text-foreground/40">You were </span><span className="font-semibold text-amber-400">accepted</span><span className="text-foreground/40"> into </span><span className="font-semibold text-foreground/90">Nova AI Agent</span></>,
    sub: '2 days ago', tag: 'joined', tagColor: 'bg-amber-500/10 text-amber-400',
  },
];

const PROJECTS = [
  { id: 1, name: 'Quantum Trade Engine', role: 'Senior Backend Engineer', progress: 50, color: 'from-indigo-500 to-purple-600', stack: ['Rust', 'Solana'], open: 2 },
  { id: 2, name: 'Nova AI Agent',        role: 'ML Engineer',             progress: 33, color: 'from-violet-500 to-purple-600', stack: ['Python', 'LLM'], open: 2 },
];

const MY_APPLICATIONS = [
  { id: 1, project: 'ChainDocs', role: 'ZK Engineer', type: 'project', status: 'pending',  daysAgo: 1 },
  { id: 2, project: 'ETHGlobal London', role: 'Full Stack', type: 'hackathon', status: 'accepted', daysAgo: 3 },
  { id: 3, project: 'FocusFlow', role: 'Mobile Dev', type: 'project', status: 'rejected', daysAgo: 5 },
];

const DEADLINES = [
  { name: 'ETHGlobal London', type: 'hackathon', daysLeft: 5,  color: 'text-pink-400',   bg: 'bg-pink-500/10 border-pink-500/20' },
  { name: 'Nova AI — Sprint 3', type: 'milestone', daysLeft: 2, color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20' },
  { name: 'OpenAI Hackathon',  type: 'hackathon', daysLeft: 12, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
];

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; label: string; cls: string }> = {
  pending:  { icon: <Hourglass size={12} />,    label: 'Pending',  cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  accepted: { icon: <CheckCircle2 size={12} />, label: 'Accepted', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  rejected: { icon: <XCircle size={12} />,      label: 'Rejected', cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  const [mockApplications, setMockApplications] = useState([
    {
      _id: 'app_123',
      userId: { name: 'Mark Zuckerberg' },
      role: 'Frontend Dev',
      status: 'pending',
      applicationType: 'project',
      projectName: 'Quantum Trade Engine',
      votes: [{ voterId: { name: 'Sarah Connor' }, voterName: 'Sarah Connor', vote: 'approve' }],
      currentUserId: 'my_id',
    },
    {
      _id: 'app_456',
      userId: { name: 'Ada Lovelace' },
      role: 'AI Engineer',
      status: 'pending',
      applicationType: 'hackathon',
      hackathonName: 'ETHGlobal London',
      votes: [],
      currentUserId: 'my_id',
    },
  ]);

  const handleVote = async (appId: string, vote: 'approve' | 'reject') => {
    await new Promise(r => setTimeout(r, 600));
    setMockApplications(prev => prev.map(app => {
      if (app._id !== appId) return app;
      const newVotes = [...app.votes, { voterId: { name: 'You' }, voterName: 'You', vote }];
      const approvals  = newVotes.filter(v => v.vote === 'approve').length;
      const rejections = newVotes.filter(v => v.vote === 'reject').length;
      let newStatus = app.status;
      if (approvals  >= 2) newStatus = 'accepted';
      if (rejections >= 2) newStatus = 'rejected';
      return { ...app, votes: newVotes, status: newStatus };
    }));
  };

  return (
    <div className="pt-28 pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[180px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-2">Welcome back 👋</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Mission Control</span>
            </h1>
            <Link href="/projects/new">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 transition-all shrink-0">
                <Plus size={16} /> New Project
              </button>
            </Link>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.07] hover:border-foreground/[0.12] transition-all group">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center ${s.color} shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className="text-xl font-black text-foreground">{s.value.toLocaleString()}</p>
                <p className="text-[10px] text-foreground/35 font-semibold uppercase tracking-wider">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ═══ LEFT (2/3) ═══ */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Active Projects */}
            <div className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Rocket size={18} className="text-indigo-400" /> Active Projects
                </h3>
                <Link href="/projects" className="text-xs text-foreground/40 hover:text-indigo-400 transition-colors flex items-center gap-1">
                  All projects <ArrowRight size={12} />
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {PROJECTS.map(p => (
                  <Link key={p.id} href={`/projects/${p.id}`}>
                    <div className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] hover:border-indigo-500/25 hover:-translate-y-0.5 transition-all duration-300">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                        <Code2 size={18} className="text-white" />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-sm text-foreground group-hover:text-indigo-400 transition-colors truncate">{p.name}</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full shrink-0">{p.open} open</span>
                        </div>
                        <p className="text-xs text-foreground/40 mb-2">Your role: <span className="text-foreground/60 font-medium">{p.role}</span></p>
                        {/* Progress */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-foreground/[0.06] rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${p.color} rounded-full`} style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-[10px] text-foreground/30 font-medium shrink-0">{p.progress}%</span>
                        </div>
                      </div>
                      {/* Stack */}
                      <div className="hidden sm:flex gap-1.5 shrink-0">
                        {p.stack.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-foreground/[0.04] border border-foreground/[0.07] rounded text-[10px] text-foreground/40 font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                      <ExternalLink size={14} className="text-foreground/20 group-hover:text-indigo-400 transition-colors shrink-0 hidden sm:block" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Activity size={18} className="text-purple-400" /> Build in Public Activity
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/25 bg-foreground/[0.04] px-2.5 py-1 rounded-full border border-foreground/[0.07]">Live</span>
              </div>
              <div className="flex flex-col gap-0">
                {ACTIVITY.map((a, i) => (
                  <div key={a.id} className={`flex gap-4 py-4 ${i < ACTIVITY.length - 1 ? 'border-b border-foreground/[0.05]' : ''}`}>
                    {/* Avatar + connector */}
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${a.color} text-white text-xs font-black flex items-center justify-center shrink-0`}>
                        {a.avatar}
                      </div>
                      {i < ACTIVITY.length - 1 && <div className="w-px flex-1 bg-foreground/[0.05]" />}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm leading-snug">{a.text}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${a.tagColor} border border-current/20`}>
                          {a.tag}
                        </span>
                      </div>
                      {a.note && (
                        <div className="mt-2 text-xs text-foreground/50 italic bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg px-3 py-2">
                          {a.note}
                        </div>
                      )}
                      <p className="text-[11px] text-foreground/25 mt-1.5">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Applications Status */}
            <div className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Flame size={18} className="text-pink-400" /> My Applications
                </h3>
                <span className="text-xs text-foreground/30">{MY_APPLICATIONS.length} sent</span>
              </div>
              <div className="flex flex-col gap-3">
                {MY_APPLICATIONS.map(app => {
                  const s = STATUS_CONFIG[app.status];
                  return (
                    <div key={app.id} className="flex items-center gap-4 p-3.5 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] hover:border-foreground/[0.10] transition-all group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${app.type === 'hackathon' ? 'bg-pink-500/10' : 'bg-indigo-500/10'}`}>
                        {app.type === 'hackathon'
                          ? <Zap size={15} className="text-pink-400" />
                          : <FolderGit2 size={15} className="text-indigo-400" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground/80 truncate">{app.project}</p>
                        <p className="text-[11px] text-foreground/40">Role: <span className="text-foreground/55">{app.role}</span></p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.cls}`}>
                          {s.icon} {s.label}
                        </span>
                        <span className="text-[10px] text-foreground/25">{app.daysAgo}d ago</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══ RIGHT sidebar (1/3) ═══ */}
          <div className="flex flex-col gap-6">

            {/* Upcoming Deadlines */}
            <div className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <Clock size={17} className="text-amber-400" /> Upcoming Deadlines
              </h3>
              <div className="flex flex-col gap-2.5">
                {DEADLINES.map((d, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${d.bg}`}>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${d.color} truncate`}>{d.name}</p>
                      <p className="text-[10px] text-foreground/35 capitalize">{d.type}</p>
                    </div>
                    <div className={`text-[11px] font-black shrink-0 ${d.daysLeft <= 3 ? 'text-red-400 animate-pulse' : d.color}`}>
                      {d.daysLeft}d
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Applications — collapsible accordion */}
            <div className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Users2 size={17} className="text-emerald-400" /> Team Applications
                </h3>
                <span className="text-[10px] font-bold text-foreground/30 bg-foreground/[0.04] border border-foreground/[0.07] px-2 py-0.5 rounded-full">
                  {mockApplications.length} pending
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {mockApplications.map(app => {
                  const isOpen = expandedAppId === app._id;
                  const isHackathon = app.applicationType === 'hackathon';
                  const dest = app.projectName || app.hackathonName || 'Unknown';
                  const statusCls = app.status === 'accepted'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : app.status === 'rejected'
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                  return (
                    <div key={app._id} className="rounded-xl border border-foreground/[0.07] overflow-hidden transition-all duration-300">
                      {/* Collapsed row — always visible */}
                      <button
                        onClick={() => setExpandedAppId(isOpen ? null : app._id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-foreground/[0.04] transition-colors text-left"
                      >
                        {/* Type icon */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isHackathon ? 'bg-pink-500/10' : 'bg-indigo-500/10'
                        }`}>
                          {isHackathon
                            ? <Zap size={14} className="text-pink-400" />
                            : <FolderGit2 size={14} className="text-indigo-400" />}
                        </div>
                        {/* Applicant info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground/85 truncate">{app.userId?.name}</p>
                          <p className="text-[11px] text-foreground/35 truncate">
                            {app.role} · <span className={isHackathon ? 'text-pink-400/70' : 'text-indigo-400/70'}>{dest}</span>
                          </p>
                        </div>
                        {/* Status + chevron */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${statusCls}`}>
                            {app.status}
                          </span>
                          <svg
                            className={`w-4 h-4 text-foreground/25 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      {/* Expanded card */}
                      {isOpen && (
                        <div className="border-t border-foreground/[0.06] bg-foreground/[0.015] p-3 animate-[fade-in_0.2s_ease]">
                          <VotingCard
                            application={app}
                            teamSize={3}
                            onVote={handleVote}
                            currentUserId="my_id"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suggested Mates */}
            <div className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-1">
                <MessageSquare size={17} className="text-blue-400" /> Suggested Mates
              </h3>
              <p className="text-xs text-foreground/35 mb-4">AI-matched to fill your open roles.</p>
              <div className="flex flex-col gap-2">
                {[
                  { avatar: 'L', name: 'Linus T.', role: 'SysAdmin • Expert', match: 98, color: 'from-cyan-500 to-blue-600' },
                  { avatar: 'P', name: 'Priya P.', role: 'Backend • Staff',    match: 94, color: 'from-emerald-500 to-teal-600' },
                  { avatar: 'J', name: 'Jin W.',   role: 'Full Stack • Mid',   match: 89, color: 'from-violet-500 to-purple-600' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] hover:border-blue-500/20 transition-all cursor-pointer group">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-xs font-black text-white shrink-0`}>
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground/80 group-hover:text-blue-400 transition-colors">{m.name}</p>
                      <p className="text-[10px] text-foreground/35">{m.role}</p>
                    </div>
                    <span className="text-[11px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full shrink-0">
                      {m.match}%
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/explore" className="flex items-center justify-center gap-1.5 mt-4 text-xs font-bold text-foreground/30 hover:text-blue-400 transition-colors">
                Browse all builders <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
