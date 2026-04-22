"use client";
import { Star, Users, ArrowRight, GitBranch, Clock } from 'lucide-react';
import Link from 'next/link';
import { useInView } from './useInView';
import { useCallback } from 'react';

const projects = [
  {
    id: 1,
    title: 'DeFi Lending Protocol',
    description: 'Building a next-gen lending platform on Solana with auto-rebalancing pools and flash loan integration.',
    tags: ['Rust', 'Solana', 'Web3'],
    spotsTotal: 4,
    spotsFilled: 2,
    lookingFor: ['Smart Contract Dev', 'Security Auditor'],
    hot: true,
    daysActive: 3,
  },
  {
    id: 2,
    title: 'AI Code Reviewer',
    description: 'Open-source browser extension that reviews GitHub PRs using fine-tuned LLMs with context-aware suggestions.',
    tags: ['TypeScript', 'React', 'LLMs'],
    spotsTotal: 3,
    spotsFilled: 1,
    lookingFor: ['Extension Dev', 'ML Engineer'],
    hot: true,
    daysActive: 1,
  },
  {
    id: 3,
    title: 'Focus Flow',
    description: 'Minimalist productivity app for neurodivergent users with AI-powered task decomposition and gentle nudges.',
    tags: ['Next.js', 'Tailwind', 'OpenAI'],
    spotsTotal: 3,
    spotsFilled: 2,
    lookingFor: ['UX Designer'],
    hot: false,
    daysActive: 7,
  }
];

export default function TrendingProjects() {
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
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <GitBranch size={12} /> Open Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
              Trending <span className="text-gradient bg-gradient-to-r from-indigo-400 to-cyan-400">Projects</span>
            </h2>
            <p className="text-base text-foreground/40 max-w-xl leading-relaxed">
              Jump into high-potential projects actively recruiting top talent. Find your next challenge.
            </p>
          </div>
          <Link href="/projects" className="group flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors px-5 py-2.5 rounded-full border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5">
            All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onMouseMove={handleMouseMove}
              className={`spotlight-card anim-fade-up anim-delay-${idx + 1} relative p-7 flex flex-col h-full rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] hover:border-indigo-500/20 group transition-all duration-500 ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-2">
                    {project.hot && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="text-[10px] font-bold uppercase">Hot</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[10px] text-foreground/30">
                      <Clock size={10} /> {project.daysActive}d ago
                    </div>
                  </div>
                  <div className="text-xs font-medium text-foreground/30 flex items-center gap-1.5 bg-foreground/[0.03] px-2 py-1 rounded-full">
                    <Users className="w-3 h-3" /> {project.spotsFilled}/{project.spotsTotal}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-indigo-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/40 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Looking For */}
                <div className="mb-5">
                  <p className="text-[10px] text-foreground/25 mb-2 uppercase tracking-widest font-semibold">Looking for</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.lookingFor.map((role) => (
                      <span key={role} className="px-2.5 py-1 bg-indigo-500/8 border border-indigo-500/15 text-indigo-400 rounded-lg text-[11px] font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-5 border-t border-foreground/5 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-[11px] text-foreground/30 font-medium">
                      <span className="w-1 h-1 rounded-full bg-foreground/20" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
