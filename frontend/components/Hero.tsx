"use client";
import Link from 'next/link';
import { ArrowRight, Code2, Command, Users, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 overflow-hidden">
      {/* Ultra-premium dark background with subtle radial spotlight */}
      <div className="absolute inset-0 bg-[#050a0a] -z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_70%)] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Glow Pill */}
        <div
          className="anim-entrance relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] backdrop-blur-md mb-8 overflow-hidden group hover:bg-foreground/[0.05] transition-colors cursor-pointer"
          style={{ animationName: 'entrance-fade-down', animationDuration: '0.6s' }}
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="text-xs font-semibold text-foreground/80 tracking-wide">DevMeet v2.0 Architecture</span>
          <ArrowRight size={12} className="text-foreground/50 group-hover:translate-x-1 transition-transform" />
        </div>
        
        {/* Vercel-style Typography */}
        <div className="anim-entrance anim-entrance-delay-1 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-foreground">
            Assemble your squad. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Ship at lightspeed.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            The professional network for serious builders. Find technical co-founders, join elite hackathon teams, and turn your repositories into reality.
          </p>
        </div>

        {/* Linear-style Buttons */}
        <div className="anim-entrance anim-entrance-delay-2 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto relative z-20">
          <Link href="/explore">
            <button className="relative group overflow-hidden w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold bg-foreground text-background transition-all hover:scale-105 shadow-[0_0_40px_rgba(var(--shadow-rgb),0.1)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Exploring <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
          <Link href="/projects/new">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold bg-foreground/[0.03] border border-foreground/10 text-foreground hover:bg-foreground/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
              <Command size={14} className="text-foreground/60" /> Post a Bounty
            </button>
          </Link>
        </div>

        {/* The "Hero Graphic" - A mock dashboard tilted in 3D space */}
        <div
          className="anim-entrance anim-entrance-delay-4 mt-20 relative w-full max-w-5xl"
          style={{ animationName: 'entrance-hero-dashboard', animationDuration: '1.2s' }}
        >
          {/* Glowing pedestal under the dashboard */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 bg-emerald-500/20 blur-[100px] -z-10" />

          <div
            className="w-full aspect-[21/9] rounded-2xl border border-foreground/10 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Fake Mac Window Header */}
            <div className="h-10 w-full border-b border-foreground/5 bg-foreground/[0.02] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="mx-auto text-[10px] text-foreground/30 font-mono tracking-widest">devmeet-workspace.tsx</div>
            </div>
            
            {/* Fake Dashboard Content */}
            <div className="flex-1 p-6 grid grid-cols-3 gap-6">
              {/* Sidebar Mock */}
              <div className="col-span-1 flex flex-col gap-4">
                <div className="h-8 w-1/2 bg-foreground/5 rounded-md" />
                <div className="h-24 w-full bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl" />
                <div className="h-24 w-full bg-foreground/[0.02] border border-foreground/5 rounded-xl flex items-center justify-center">
                  <Users className="text-foreground/20 w-8 h-8" />
                </div>
              </div>
              
              {/* Main Content Mock */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="h-32 flex-1 bg-foreground/[0.02] border border-foreground/5 rounded-xl p-4 flex flex-col">
                    <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center mb-auto">
                      <Code2 className="text-accent w-4 h-4" />
                    </div>
                    <div className="h-2 w-3/4 bg-foreground/10 rounded mt-4" />
                    <div className="h-2 w-1/2 bg-foreground/5 rounded mt-2" />
                  </div>
                  <div className="h-32 flex-1 bg-foreground/[0.02] border border-foreground/5 rounded-xl p-4 flex flex-col">
                    <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center mb-auto">
                      <Globe className="text-primary w-4 h-4" />
                    </div>
                    <div className="h-2 w-3/4 bg-foreground/10 rounded mt-4" />
                    <div className="h-2 w-1/2 bg-foreground/5 rounded mt-2" />
                  </div>
                </div>
                <div className="flex-1 w-full bg-foreground/[0.02] border border-foreground/5 rounded-xl overflow-hidden relative">
                   {/* Fake code terminal */}
                   <div className="p-4 font-mono text-xs text-emerald-400/70">
                     <p>$ npx create-devmeet-squad</p>
                     <p className="text-foreground/40 mt-2">&gt; Initializing protocol...</p>
                     <p className="text-foreground/40">&gt; Locating frontend engineer (React/Next.js)... <span className="text-emerald-400">FOUND</span></p>
                     <p className="text-foreground/40">&gt; Locating smart contract dev (Solidity)... <span className="text-emerald-400">FOUND</span></p>
                     <p className="text-foreground/40 animate-pulse mt-4">Ready to launch.</p>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Fade out the bottom of the dashboard */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
