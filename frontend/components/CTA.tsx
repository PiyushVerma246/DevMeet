"use client";
import Link from 'next/link';
import { ArrowRight, Sparkles, Github, Twitter } from 'lucide-react';
import { useInView } from './useInView';

const floatingCards = [
  {
    avatar: 'JD',
    name: 'Jake Doyle',
    role: 'Frontend Dev',
    time: '2m ago',
    gradient: 'from-indigo-500 to-purple-600',
    offset: 'top-8 right-12',
    delay: '0s',
  },
  {
    avatar: 'AS',
    name: 'Aisha Siddiqui',
    role: 'UI/UX Designer',
    time: 'Looking for team',
    gradient: 'from-pink-500 to-rose-600',
    offset: 'bottom-24 left-4',
    delay: '2s',
  },
  {
    avatar: 'LK',
    name: 'Lucas Kim',
    role: 'ML Engineer',
    time: '5m ago',
    gradient: 'from-emerald-500 to-teal-600',
    offset: 'top-1/2 -translate-y-1/2 left-0',
    delay: '1s',
  },
];

export default function CTA() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 particle-grid opacity-20 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />

      {/* Glow orbs */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className={`anim-scale-in relative overflow-hidden rounded-3xl border border-foreground/[0.07] bg-foreground/[0.02] backdrop-blur-xl p-12 lg:p-20 ${isVisible ? 'is-visible' : ''}`}>

          {/* Inner glow corners */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Animated border */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), transparent 40%, rgba(168,85,247,0.1) 70%, transparent)',
              maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div className={`anim-slide-left flex flex-col items-start text-left relative z-10 ${isVisible ? 'is-visible' : ''}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Start for Free</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 text-foreground tracking-tight leading-[1.08]">
                Stop dreaming.
                <br />
                <span className="text-gradient bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
                  Start building.
                </span>
              </h2>

              <p className="text-lg text-foreground/40 mb-10 max-w-lg leading-relaxed font-light">
                Your next big idea needs a team. Connect with vetted builders who are actively looking
                to collaborate right now — no résumés, no gatekeeping.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/register" className="group">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                    Create Your Profile
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/explore" className="group">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-foreground/[0.04] border border-foreground/10 text-foreground/70 hover:bg-foreground/[0.08] hover:border-foreground/20 transition-all flex items-center justify-center gap-2">
                    Browse Talent
                  </button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['AC', 'MW', 'PP', 'JO', 'SM'].map((initials, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br text-white text-[10px] font-bold flex items-center justify-center"
                      style={{
                        background: `hsl(${220 + i * 30}, 70%, 55%)`,
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground/30">
                  <span className="text-foreground/60 font-semibold">25k+</span> builders already joined
                </p>
              </div>
            </div>

            {/* Right — visual sandbox */}
            <div
              className={`anim-scale-rotate anim-delay-2 hidden lg:flex relative h-full min-h-[420px] w-full items-center justify-center pointer-events-none ${isVisible ? 'is-visible' : ''}`}
            >
              {/* Center "Match" card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 border border-foreground/10 p-6 rounded-2xl flex flex-col items-center gap-4 shadow-2xl backdrop-blur-xl scale-110 z-20">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                      <Sparkles className="text-white w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-indigo-500 px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                      Match
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-extrabold text-base">Perfect Squad</p>
                    <p className="text-indigo-400 text-sm font-semibold mt-0.5">100% Synergy</p>
                  </div>
                </div>
              </div>

              {/* Floating user cards */}
              {floatingCards.map((card, i) => (
                <div
                  key={i}
                  className={`absolute ${card.offset} bg-background/70 border border-foreground/10 p-3.5 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-md animate-float`}
                  style={{ animationDelay: card.delay, animationDuration: `${6 + i * 2}s` }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center font-bold text-sm text-white`}>
                    {card.avatar}
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm leading-none">{card.name}</p>
                    <p className="text-foreground/30 text-xs mt-1">{card.time}</p>
                  </div>
                </div>
              ))}

              {/* Connection Lines SVG */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <path d="M 80 200 Q 200 150 250 210" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                <path d="M 320 80 Q 280 150 250 210" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
                <path d="M 60 300 Q 130 260 250 210" stroke="url(#line-grad)" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
