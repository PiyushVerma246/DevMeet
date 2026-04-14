"use client";
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { useInView } from './useInView';

export default function CTA() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent -z-10" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface-hover/30 border border-foreground/5 p-12 lg:p-20 rounded-[3rem] backdrop-blur-xl relative overflow-hidden shadow-2xl">
          
          {/* Intense Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/40 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

          {/* Left Text Content */}
          <div
            className={`anim-slide-left flex flex-col items-start text-left relative z-10 ${isVisible ? 'is-visible' : ''}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-6 shadow-inner">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-foreground/80 font-bold">The Next Evolution</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground tracking-tight leading-[1.1]">
              Stop Dreaming. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-accent">
                Start Building.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-foreground/50 mb-10 max-w-lg leading-relaxed font-light">
              Your next revolutionary idea needs a team. Don&apos;t let your vision collect dust. Connect with vetted, top-tier specialists who are actively looking to build right now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/register" className="group">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(var(--shadow-rgb),0.15)] group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(var(--shadow-rgb),0.25)]">
                  Create Your Identity <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/explore" className="group">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-foreground/5 border border-foreground/10 text-foreground hover:bg-foreground/10 transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                  <span className="relative z-10">Browse Developers</span>
                  <ChevronRight className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors relative z-10" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Visual Sandbox Content */}
          <div
            className={`anim-scale-rotate anim-delay-2 hidden lg:flex relative h-full min-h-[400px] w-full items-center justify-center pointer-events-none ${isVisible ? 'is-visible' : ''}`}
          >
            {/* Visual Elements representing users joining */}
            <div className="absolute top-10 right-20 bg-surface border border-foreground/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-md animate-[float_6s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg text-foreground">JD</div>
              <div>
                <p className="text-foreground font-bold text-sm">Frontend Dev</p>
                <p className="text-foreground/40 text-xs">Joined 2m ago</p>
              </div>
            </div>

            <div className="absolute bottom-20 left-10 bg-surface border border-foreground/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-md animate-[float_8s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center font-bold text-lg text-foreground">AS</div>
              <div>
                <p className="text-foreground font-bold text-sm">UI/UX Maestro</p>
                <p className="text-foreground/40 text-xs">Looking for team</p>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface border border-foreground/10 p-6 rounded-3xl flex flex-col items-center gap-4 shadow-2xl backdrop-blur-xl scale-125 z-20">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary via-accent to-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Sparkles className="text-foreground w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-black border border-foreground/20 px-2 py-1 rounded-full text-[10px] font-bold text-foreground uppercase tracking-widest">
                  Match
                </div>
              </div>
              <div className="text-center">
                <p className="text-foreground font-extrabold text-lg">Perfect Squad</p>
                <p className="text-accent text-sm font-semibold">100% Synergy</p>
              </div>
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full -z-10 opacity-30" preserveAspectRatio="none">
              <path d="M 150 100 Q 250 200 400 250" stroke="url(#cyan-glow)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-[pulse-slow_3s_linear_infinite]" />
              <path d="M 100 300 Q 200 250 400 250" stroke="url(#cyan-glow)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-[pulse-slow_4s_linear_infinite]" />
              <defs>
                <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
