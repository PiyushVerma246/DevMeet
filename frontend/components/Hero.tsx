"use client";
import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ===== Particle Canvas Background ===== */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const PARTICLE_COUNT = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 opacity-70" />;
}

/* ===== Floating Orbs ===== */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] animate-float" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[90px] animate-float-delayed" />
      <div className="absolute bottom-[10%] left-[40%] w-[350px] h-[350px] rounded-full bg-pink-500/5 blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
    </div>
  );
}

/* ===== Animated Text ===== */
function AnimatedTitle() {
  const words = ["teammates", "co-founders", "designers", "your squad"];
  const [currentWord, setCurrentWord] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed === word) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setCurrentWord((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(
          isDeleting ? word.substring(0, displayed.length - 1) : word.substring(0, displayed.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentWord]);

  return (
    <span className="text-gradient bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block min-w-[280px] lg:min-w-[340px] text-left">
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-24">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0)_50%,var(--background)_100%)] -z-20 pointer-events-none" />
      <ParticleField />
      <FloatingOrbs />

      {/* Radial gradient spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,rgba(168,85,247,0.08)_30%,rgba(0,0,0,0)_70%)] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Status Pill */}
        <div
          className="anim-entrance relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-md mb-8 overflow-hidden group hover:border-indigo-500/40 hover:bg-indigo-500/20 transition-all cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          style={{ animationName: 'entrance-fade-down', animationDuration: '0.6s' }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
          <Sparkles size={14} className="text-indigo-400 animate-pulse" />
          <span className="text-xs font-bold text-indigo-100 tracking-wide">Open Source • Free Forever</span>
          <ArrowRight size={12} className="text-white/60 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </div>

        {/* Main Headline */}
        <div className="anim-entrance anim-entrance-delay-1 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            <span className="text-foreground">Find </span>
            <AnimatedTitle />
            <br />
            <span className="text-foreground/70 font-extrabold relative inline-block mt-2">
              Ship what matters.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground/50 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            The collaboration network for builders who actually ship. Form squads for hackathons,
            find technical co-founders, and turn side projects into startups.
          </p>
        </div>

        {/* Buttons */}
        <div className="anim-entrance anim-entrance-delay-2 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto relative z-20 mb-16">
          <Link href="/explore">
            <button className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_45px_rgba(99,102,241,0.4)]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Exploring <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
          <Link href="/projects/new">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-surface border border-foreground/10 text-foreground/80 hover:bg-foreground/[0.05] hover:border-foreground/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
              Post a Project
            </button>
          </Link>
        </div>

        {/* Dynamic Floating Cards (Replaces the large dashboard) */}
        <div className="anim-entrance anim-entrance-delay-3 relative w-full max-w-5xl mx-auto h-[280px] sm:h-[320px] md:h-[260px] flex justify-center items-center perspective-1000">
          
          {/* Card 1: Project Setup (Left) */}
          <div className="absolute left-[5%] md:left-[10%] lg:left-[15%] top-10 w-64 md:w-72 p-5 rounded-2xl border border-foreground/[0.08] bg-background/60 backdrop-blur-xl shadow-2xl hidden md:flex flex-col transform rotate-[-6deg] hover:rotate-[-2deg] transition-transform duration-500 animate-float-delayed z-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Code2 size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground/90">DeFi Protocol</h3>
                <p className="text-[11px] text-foreground/50">Looking for Rust Dev</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider">Capacity</span>
                <span className="text-xs font-bold text-pink-400">2/3</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 w-2/3 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Match Found (Center) */}
          <div className="absolute w-80 md:w-96 p-6 rounded-2xl border border-indigo-500/30 bg-background/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(99,102,241,0.15)] flex flex-col z-10 transform hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Live Match</span>
              </div>
              <Sparkles size={14} className="text-indigo-400/60" />
            </div>
            <div className="flex relative items-center justify-center py-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-background flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg shadow-indigo-500/20">
                JP
              </div>
              <div className="w-10 border-t-2 border-dashed border-indigo-500/40 relative">
                <ArrowRight size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-4 border-background flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg shadow-emerald-500/20">
                AL
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-foreground font-black text-lg">Squad Assembled</h3>
              <p className="text-foreground/40 text-xs mt-1 font-medium">Ready to start building</p>
            </div>
            <button className="mt-6 w-full py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-bold transition-all shadow-inner">
              Enter UI/UX Workspace
            </button>
          </div>

          {/* Card 3: Deployment (Right) */}
          <div className="absolute right-[5%] md:right-[10%] lg:right-[15%] top-12 w-64 md:w-72 p-5 rounded-2xl border border-foreground/[0.08] bg-background/60 backdrop-blur-xl shadow-2xl hidden lg:flex flex-col transform rotate-[6deg] hover:rotate-[2deg] transition-transform duration-500 animate-float z-0" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Zap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground/90">Production</h3>
                <p className="text-[11px] text-foreground/50">Deployment successful</p>
              </div>
            </div>
            <div className="bg-foreground/[0.03] border border-foreground/[0.05] rounded-xl p-3.5 font-mono text-[10px] text-emerald-400/80 shadow-inner">
              <p className="mb-1 text-foreground/40">&gt; Build complete in 12s</p>
              <p className="mb-2 text-foreground/40">&gt; Optimizing assets...</p>
              <p className="flex items-center gap-1.5 font-bold text-emerald-400"><span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Deployed to edge</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
