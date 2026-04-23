"use client";
import Link from 'next/link';
import { useInView } from './useInView';
import {
  Users, ArrowRight, Sparkles, MapPin, Star,
  FolderGit2, Rocket, ShieldCheck, Zap, Trophy,
  Code2, GitBranch, CheckCircle2,
} from 'lucide-react';

// ── Explore Feature ────────────────────────────────────────────────────────────
function ExploreFeature({ isVisible }: { isVisible: boolean }) {
  const bullets = [
    { icon: <ShieldCheck size={15} />, text: 'Verified GitHub portfolios & contribution graphs' },
    { icon: <MapPin size={15} />, text: 'Filter by role, tech stack, timezone & availability' },
    { icon: <Sparkles size={15} />, text: 'AI-ranked matches based on your project needs' },
    { icon: <Star size={15} />, text: 'Peer ratings & shipped-project badges' },
  ];

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-16 anim-fade-up ${isVisible ? 'is-visible' : ''}`}>
      {/* Visual Panel */}
      <div className="flex-1 relative">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-3xl blur-2xl scale-95" />
        <div className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden p-8 backdrop-blur-sm">
          {/* Mock profile cards stacked */}
          <div className="flex flex-col gap-3">
            {[
              { avatar: 'AC', name: 'Alice Chen', role: 'Fullstack · Senior', color: 'from-indigo-500 to-purple-600', badge: 'Available', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
              { avatar: 'MW', name: 'Marcus Wei', role: 'UI/UX Designer · Lead', color: 'from-pink-500 to-rose-600', badge: 'Hackathon Mode', badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
              { avatar: 'PP', name: 'Priya Patel', role: 'Backend Architect · Staff', color: 'from-emerald-500 to-teal-600', badge: 'Open to collab', badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] hover:border-purple-500/20 transition-all duration-300 group"
                style={{ transform: `translateY(${i * 2}px)`, opacity: 1 - i * 0.08 }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground group-hover:text-purple-400 transition-colors truncate">{p.name}</p>
                  <p className="text-[11px] text-foreground/40 truncate">{p.role}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor} shrink-0 hidden sm:block`}>
                  {p.badge}
                </span>
              </div>
            ))}

            {/* Skill tags row */}
            <div className="flex flex-wrap gap-2 mt-2 px-1">
              {['React', 'Go', 'Solidity', 'Figma', 'Python', 'Rust', 'Kubernetes'].map(s => (
                <span key={s} className="px-2.5 py-1 bg-foreground/[0.04] border border-foreground/[0.07] rounded-lg text-[11px] text-foreground/50 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Search bar mockup */}
          <div className="mt-5 flex items-center gap-3 px-4 py-3 bg-background/50 border border-foreground/10 rounded-xl">
            <div className="w-4 h-4 rounded-full bg-purple-500/40 shrink-0" />
            <span className="text-sm text-foreground/30 flex-1">Search by skill, role, or location…</span>
            <div className="text-[10px] font-bold text-purple-400 border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 rounded">Filter</div>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="flex-1 flex flex-col gap-6 lg:pl-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest w-fit">
          <Users size={13} /> Talent Directory
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Find builders who{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            actually ship
          </span>
        </h2>
        <p className="text-foreground/50 text-lg leading-relaxed">
          Browse a curated network of verified developers, designers, and Web3 specialists. Every profile is backed by real code, not just a résumé.
        </p>
        <ul className="flex flex-col gap-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/60">
              <span className="mt-0.5 text-purple-400 shrink-0">{b.icon}</span>
              {b.text}
            </li>
          ))}
        </ul>
        <Link
          href="/explore"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-sm font-bold hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 w-fit"
        >
          Browse the Directory
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// ── Projects Feature ───────────────────────────────────────────────────────────
function ProjectsFeature({ isVisible }: { isVisible: boolean }) {
  const bullets = [
    { icon: <FolderGit2 size={15} />, text: 'Post a project spec with roles, stack & goals' },
    { icon: <Code2 size={15} />, text: 'Manage applications inside a structured project room' },
    { icon: <GitBranch size={15} />, text: 'Track progress, milestones and contributions' },
    { icon: <CheckCircle2 size={15} />, text: 'Build a portfolio of shipped, real-world work' },
  ];

  const roles = ['Frontend Dev', 'Solidity Eng', 'UI/UX Designer', 'ML Engineer', 'DevOps', 'PM'];

  return (
    <div className={`flex flex-col lg:flex-row-reverse items-center gap-16 anim-fade-up anim-delay-2 ${isVisible ? 'is-visible' : ''}`}>
      {/* Visual Panel */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 rounded-3xl blur-2xl scale-95" />
        <div className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden p-8 backdrop-blur-sm">
          {/* Project spec mockup */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <Rocket size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">DeFi Lending Protocol</p>
                <p className="text-[11px] text-foreground/40">Rust · Solana · Web3</p>
              </div>
              <span className="ml-auto text-[10px] font-bold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">🔥 HOT</span>
            </div>
            <p className="text-sm text-foreground/40 leading-relaxed mb-4">
              Building a next-gen lending platform with auto-rebalancing pools and flash loan integration.
            </p>

            {/* Roles needed */}
            <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/25 mb-2">Roles Needed</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {roles.slice(0, 4).map(r => (
                <span key={r} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-[11px] font-semibold">
                  {r}
                </span>
              ))}
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-foreground/40 font-medium">Team slots filled</span>
              <span className="text-foreground/70 font-bold">2 / 5</span>
            </div>
            <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
            </div>
          </div>

          {/* More project cards peeking */}
          <div className="flex flex-col gap-2.5">
            {['AI Code Reviewer', 'Focus Flow App'].map((title, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06]">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                  <Code2 size={13} className="text-white" />
                </div>
                <span className="text-sm text-foreground/60 font-medium flex-1 truncate">{title}</span>
                <span className="text-[10px] text-foreground/30">Recruiting →</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="flex-1 flex flex-col gap-6 lg:pr-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest w-fit">
          <FolderGit2 size={13} /> Projects Radar
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Launch your idea.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Build your squad.
          </span>
        </h2>
        <p className="text-foreground/50 text-lg leading-relaxed">
          Post a project brief, define the roles you need, and let verified builders apply to join. No cold DMs, no endless searching — just a structured path from idea to shipped product.
        </p>
        <ul className="flex flex-col gap-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/60">
              <span className="mt-0.5 text-indigo-400 shrink-0">{b.icon}</span>
              {b.text}
            </li>
          ))}
        </ul>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-sm font-bold hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-300 w-fit"
        >
          Explore Projects
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// ── Hackathons Feature ─────────────────────────────────────────────────────────
function HackathonsFeature({ isVisible }: { isVisible: boolean }) {
  const bullets = [
    { icon: <Zap size={15} />, text: 'Join the live queue and get recruited in minutes' },
    { icon: <Trophy size={15} />, text: 'Assemble a full-stack team for 48-hour sprints' },
    { icon: <ShieldCheck size={15} />, text: 'Pre-vetted specialists — no randoms, no risk' },
    { icon: <Rocket size={15} />, text: 'Track upcoming hackathons and deadlines' },
  ];

  const specialists = [
    { avatar: 'JP', role: 'Full Stack Eng', color: 'from-cyan-500 to-blue-600', hackathon: 'ETHGlobal London', days: 5 },
    { avatar: 'SM', role: 'AI/ML Engineer', color: 'from-violet-500 to-purple-600', hackathon: 'OpenAI Hackathon', days: 12 },
    { avatar: 'ER', role: 'Smart Contract', color: 'from-emerald-500 to-teal-600', hackathon: 'ETHGlobal London', days: 5 },
  ];

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-16 anim-fade-up anim-delay-3 ${isVisible ? 'is-visible' : ''}`}>
      {/* Visual Panel */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 to-cyan-500/10 rounded-3xl blur-2xl scale-95" />
        <div className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden p-8 backdrop-blur-sm">
          {/* Sprint header */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl">
            <Zap size={16} className="text-pink-400 fill-pink-400" />
            <span className="text-sm font-bold text-pink-400">Sprint Mode — Live Queue</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[11px] text-pink-400/70 font-semibold">Live</span>
            </div>
          </div>

          {/* Specialist cards */}
          <div className="flex flex-col gap-3">
            {specialists.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] hover:border-pink-500/20 transition-all duration-300 group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground group-hover:text-pink-400 transition-colors">{s.role}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Trophy size={10} className="text-amber-400" />
                    <p className="text-[11px] text-foreground/40 truncate">{s.hackathon}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-bold text-foreground/30">{s.days}d left</span>
                  <button className="mt-1 text-[10px] font-bold px-2.5 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full hover:bg-pink-500 hover:text-white transition-all">
                    Recruit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-5 flex items-center justify-between px-4 py-3 bg-foreground/[0.03] rounded-xl border border-foreground/[0.06]">
            <span className="text-sm text-foreground/40 font-medium"><span className="text-foreground font-bold">142</span> builders in queue</span>
            <span className="text-[11px] font-bold text-pink-400">Join the Queue →</span>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="flex-1 flex flex-col gap-6 lg:pl-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest w-fit">
          <Zap size={13} className="fill-pink-400" /> Hackathon Mode
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Assemble your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
            dream team
          </span>{' '}
          in minutes
        </h2>
        <p className="text-foreground/50 text-lg leading-relaxed">
          Weekend hackathons move fast. DevMeet's Sprint Mode connects you with pre-vetted specialists who are <em>explicitly</em> looking to team up — filtered by your exact event and tech stack.
        </p>
        <ul className="flex flex-col gap-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/60">
              <span className="mt-0.5 text-pink-400 shrink-0">{b.icon}</span>
              {b.text}
            </li>
          ))}
        </ul>
        <Link
          href="/hackathons"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-400 text-sm font-bold hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 w-fit"
        >
          Find Your Squad
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function FeaturesShowcase() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[180px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-24 anim-fade-up ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.08] text-foreground/50 text-xs font-bold uppercase tracking-widest mb-6">
            Platform Features
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
            Three ways to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              build together
            </span>
          </h2>
          <p className="text-foreground/40 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you're assembling a startup co-founder, recruiting for a side project, or prepping a hackathon squad — DevMeet has a mode for it.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-24" />

        {/* Feature rows */}
        <div className="flex flex-col gap-32">
          <ExploreFeature isVisible={isVisible} />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />
          <ProjectsFeature isVisible={isVisible} />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />
          <HackathonsFeature isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
}
