"use client";
import { motion } from 'framer-motion';
import { Star, Users, ArrowRight, Code } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'DeFi Lending Protocol',
    description: 'Looking for a solid Rust/Solana dev to build out the core logic. UI is already done in Next.js.',
    tags: ['Rust', 'Solana', 'Web3'],
    spotsTotal: 4,
    spotsFilled: 2,
    LookingFor: ['Smart Contract', 'Auditor']
  },
  {
    id: 2,
    title: 'AI Code Reviewer',
    description: 'An open-source browser extension that reviews PRs using an open-source LLM. Needs extension experts.',
    tags: ['TypeScript', 'React', 'OpenAI API'],
    spotsTotal: 3,
    spotsFilled: 1,
    LookingFor: ['Frontend', 'Chrome Extension API']
  },
  {
    id: 3,
    title: 'NextGen Task Manager',
    description: 'Building a beautiful, minimalistic task manager for neurodivergent folks. Need a killer UX designer.',
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
    spotsTotal: 3,
    spotsFilled: 2,
    LookingFor: ['UI/UX Designer']
  }
];

export default function TrendingProjects() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Trending Projects
            </h2>
            <p className="text-lg text-white/50 max-w-2xl">
              Jump into high-potential projects that are actively recruiting top talent right now.
            </p>
          </div>
          <Link href="/projects" className="group flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold">
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card p-8 flex flex-col h-full rounded-3xl border border-white/5 hover:border-primary/30 group"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/70">
                  <Star className="w-3 h-3 text-yellow-500" /> actively recruiting
                </div>
                <div className="text-sm font-medium text-white/40 flex items-center gap-1">
                  <Users className="w-4 h-4" /> {project.spotsFilled}/{project.spotsTotal}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="mb-6">
                <p className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Looking for:</p>
                <div className="flex flex-wrap gap-2">
                  {project.LookingFor.map((role) => (
                    <span key={role} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs text-white/50">
                    <Code className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
