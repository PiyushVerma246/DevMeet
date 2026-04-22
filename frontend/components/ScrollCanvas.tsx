"use client";
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ScrollCanvas: A full-viewport, scroll-linked visual effect.
 * As the user scrolls through this section, a generative canvas animation
 * morphs through phases — representing "connection", "collaboration", and "launch".
 */

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

const PHASES = [
  { title: 'Discover', subtitle: 'Find builders who share your vision', icon: '🔍' },
  { title: 'Connect', subtitle: 'Form squads with complementary skills', icon: '🤝' },
  { title: 'Build', subtitle: 'Collaborate in real-time project rooms', icon: '⚡' },
  { title: 'Launch', subtitle: 'Ship your project to the world', icon: '🚀' },
];

const COLORS = [
  'rgba(99, 102, 241,',   // indigo
  'rgba(168, 85, 247,',   // purple
  'rgba(236, 72, 153,',   // pink
  'rgba(16, 185, 129,',   // emerald
];

export default function ScrollCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [activePhase, setActivePhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.min(200, Math.floor((width * height) / 8000));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Scroll handler
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / sectionHeight));
      progressRef.current = p;
      setProgress(p);
      setActivePhase(Math.min(PHASES.length - 1, Math.floor(p * PHASES.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animation loop
    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const p = progressRef.current;

      // Clear with trail effect
      ctx.fillStyle = `rgba(3, 7, 18, ${0.15 + p * 0.1})`;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const centerX = w / 2;
      const centerY = h / 2;

      // Phase-based behavior
      const phase = Math.min(3, Math.floor(p * 4));
      const phaseProgress = (p * 4) - phase;

      for (const particle of particles) {
        const t = time * 0.001;

        switch (phase) {
          case 0: {
            // Scattered — drifting randomly
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x < 0 || particle.x > w) particle.vx *= -1;
            if (particle.y < 0 || particle.y > h) particle.vy *= -1;
            break;
          }
          case 1: {
            // Converging — particles gravitate toward clusters
            const clusterCount = 5;
            const clusterIdx = Math.floor((particle.baseX / w) * clusterCount);
            const targetX = ((clusterIdx + 0.5) / clusterCount) * w;
            const targetY = centerY + Math.sin(t + clusterIdx) * 50;
            const lerp = phaseProgress * 0.03;
            particle.x += (targetX - particle.x) * lerp + particle.vx * (1 - phaseProgress);
            particle.y += (targetY - particle.y) * lerp + particle.vy * (1 - phaseProgress);
            break;
          }
          case 2: {
            // Orbiting — particles form a swirling ring
            const angle = particle.phase + t * 0.5;
            const radius = 120 + Math.sin(particle.phase * 3) * 80;
            const targetX2 = centerX + Math.cos(angle) * radius * (0.5 + phaseProgress * 0.5);
            const targetY2 = centerY + Math.sin(angle) * radius * (0.5 + phaseProgress * 0.5) * 0.6;
            particle.x += (targetX2 - particle.x) * 0.04;
            particle.y += (targetY2 - particle.y) * 0.04;
            break;
          }
          case 3: {
            // Explosion — outward burst then dissolve
            const burstAngle = particle.phase;
            const burstDist = phaseProgress * 500;
            const targetX3 = centerX + Math.cos(burstAngle) * burstDist;
            const targetY3 = centerY + Math.sin(burstAngle) * burstDist;
            particle.x += (targetX3 - particle.x) * 0.06;
            particle.y += (targetY3 - particle.y) * 0.06;
            break;
          }
        }

        // Draw connections in phase 1 & 2
        if (phase === 1 || phase === 2) {
          for (const other of particles) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80 && dist > 0) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `${particle.color} ${0.1 * (1 - dist / 80)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Draw particle
        const glowSize = particle.size * (1 + Math.sin(t * 2 + particle.phase) * 0.3);
        const alphaModifier = phase === 3 ? Math.max(0, 1 - phaseProgress * 1.5) : 1;

        // Glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color} ${particle.alpha * 0.1 * alphaModifier})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color} ${particle.alpha * alphaModifier})`;
        ctx.fill();
      }

      // Draw center ring in phase 2
      if (phase === 2) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120 + Math.sin(time * 0.002) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * phaseProgress})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [initParticles]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        {/* Phase Indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
          {PHASES.map((phase, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-all duration-500 ${
                activePhase === idx
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-20 -translate-x-2'
              }`}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activePhase === idx
                  ? 'bg-indigo-400 shadow-lg shadow-indigo-400/50 scale-120'
                  : 'bg-foreground/20'
              }`} />
              <span className={`text-xs font-medium transition-colors duration-500 ${
                activePhase === idx ? 'text-foreground/80' : 'text-foreground/20'
              }`}>
                {phase.title}
              </span>
            </div>
          ))}
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center transition-all duration-700">
            <div className="text-5xl mb-4 transition-all duration-500" style={{ transform: `scale(${1 + progress * 0.2})` }}>
              {PHASES[activePhase].icon}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground/90 mb-3 tracking-tight transition-all duration-500">
              {PHASES[activePhase].title}
            </h2>
            <p className="text-base md:text-lg text-foreground/40 font-light max-w-md mx-auto">
              {PHASES[activePhase].subtitle}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 z-20">
          <div className="h-1 bg-foreground/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-center text-[10px] text-foreground/20 mt-2 uppercase tracking-widest font-medium">
            Scroll to explore
          </p>
        </div>
      </div>
    </div>
  );
}
