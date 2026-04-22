"use client";
import { Users, Code2, Rocket, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { useInView } from './useInView';
import { useCallback } from 'react';

const features = [
  {
    icon: <Users size={22} />,
    title: "Smart Matching",
    desc: "AI-driven teammate matching based on skills, experience, timezone, and hackathon preferences.",
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: <Code2 size={22} />,
    title: "Project Rooms",
    desc: "Create detailed project specs, define roles, and manage applications — all in one place.",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: <Rocket size={22} />,
    title: "Hackathon Mode",
    desc: "Time-gated sprint engine to instantly recruit specialized teammates for 48-hour events.",
    color: "pink",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: <Briefcase size={22} />,
    title: "Trust System",
    desc: "Build reputation through peer reviews, verified GitHub contributions, and shipped projects.",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: <Zap size={22} />,
    title: "Real-Time Chat",
    desc: "WebSocket-powered messaging inside project rooms. Communicate before committing externally.",
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Skill Verification",
    desc: "GitHub stats, contribution graphs, and project history prove you're a builder, not just a talker.",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
  }
];

export default function FeatureCards() {
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
      {/* Background mesh */}
      <div className="absolute inset-0 particle-grid opacity-30 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/50 text-xs font-semibold uppercase tracking-widest mb-6">
            Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            Everything you need to
            <br />
            <span className="text-gradient bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">ship together</span>
          </h2>
          <p className="text-base text-foreground/35 max-w-2xl mx-auto leading-relaxed">
            A complete toolkit for assembling squads — not submitting resumes. From discovery to deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" ref={ref}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              className={`spotlight-card anim-fade-up anim-delay-${idx + 1} relative p-7 flex flex-col gap-5 group rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] hover:border-${feature.color}-500/20 transition-all duration-500 ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="relative z-10 flex flex-col gap-4">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground/90 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-foreground/35 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
