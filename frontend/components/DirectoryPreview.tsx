"use client";
import { Compass, FolderGit2, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInView } from './useInView';

const sections = [
  {
    title: "Explore Community",
    icon: <Compass size={32} className="text-accent" />,
    desc: "Browse developers by skill, reputation, and availability. Find your next co-founder or mentor.",
    href: "/explore",
    color: "from-accent to-blue-600",
    hoverBorder: "hover:border-accent/50",
    shadow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
  },
  {
    title: "Open Projects",
    icon: <FolderGit2 size={32} className="text-primary" />,
    desc: "Discover exciting projects looking for contributors. Apply for roles and join active teams.",
    href: "/projects",
    color: "from-primary to-emerald-600",
    hoverBorder: "hover:border-primary/50",
    shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
  },
  {
    title: "Hackathon Squads",
    icon: <Zap size={32} className="text-pink-400" />,
    desc: "Sprint Mode: find highly-specialized teammates ready to build and win this weekend.",
    href: "/hackathons",
    color: "from-pink-400 to-purple-600",
    hoverBorder: "hover:border-pink-400/50",
    shadow: "hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]"
  }
];

export default function DirectoryPreview() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-12 container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={ref}>
        {sections.map((sec, idx) => (
          <div
            key={sec.title}
            className={`anim-fade-up anim-delay-${idx + 1} ${isVisible ? 'is-visible' : ''}`}
          >
            <Link href={sec.href} className={`glass-card p-8 h-full flex flex-col group relative overflow-hidden transition-all duration-300 border border-foreground/5 ${sec.hoverBorder} ${sec.shadow}`}>
              
              {/* Background Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${sec.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

              <div className="mb-6 bg-foreground/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl border border-foreground/10">
                {sec.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                {sec.title}
              </h3>
              
              <p className="text-foreground/60 leading-relaxed mb-8 flex-grow pr-4">
                {sec.desc}
              </p>

              <div className="flex items-center text-sm font-bold tracking-widest text-foreground/40 uppercase group-hover:text-foreground transition-colors mt-auto">
                Enter <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
