"use client";
import { motion } from 'framer-motion';
import { Users, Code2, Rocket, Briefcase, Zap, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Users size={24} className="text-primary" />,
    title: "Smart Teammate Matching",
    desc: "AI-driven matching based on your skill tags, experience level, and hackathon availability."
  },
  {
    icon: <Code2 size={24} className="text-accent" />,
    title: "Project System",
    desc: "Create detailed project specs, specify roles (Frontend, Backend, Design), and start gathering requests."
  },
  {
    icon: <Rocket size={24} className="text-pink-500" />,
    title: "Hackathon Mode",
    desc: "A unique time-gated engine to instantly find specialized teammates for upcoming 48-hour sprints."
  },
  {
    icon: <Briefcase size={24} className="text-emerald-500" />,
    title: "Portfolio & Trust System",
    desc: "Build your reputation score. Review past teammates and link repos to verify skills."
  },
  {
    icon: <Zap size={24} className="text-yellow-500" />,
    title: "Real-Time Collaboration",
    desc: "Instant chat using WebSockets inside project rooms before committing to external communication."
  },
  {
    icon: <ShieldCheck size={24} className="text-blue-500" />,
    title: "Skill Verification",
    desc: "An ecosystem where GitHub stats and project history prove you are a builder, not just a talker."
  }
];

export default function FeatureCards() {
  return (
    <section className="py-24 container mx-auto px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-4">
          The Hub for True Builders
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto">
          Finally, a centralized platform focusing on assembling squads—not submitting resumes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-card p-6 flex flex-col gap-4 group"
          >
            <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white/90">{feature.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
