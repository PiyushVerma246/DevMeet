"use client";
import { useInView } from './useInView';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { id: 1, name: 'Active Builders', value: 25000, suffix: '+', prefix: '' },
  { id: 2, name: 'Projects Shipped', value: 8500, suffix: '+', prefix: '' },
  { id: 3, name: 'Hackathons Won', value: 1200, suffix: '+', prefix: '' },
  { id: 4, name: 'Lines of Code', value: 50, suffix: 'M+', prefix: '' },
];

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, value]);

  const formatted = value >= 1000 ? (count / 1000).toFixed(count >= value ? 0 : 1).replace(/\.0$/, '') + 'k' : count.toString();

  return (
    <span>
      {value >= 1000 ? `${(count / 1000).toFixed(count < 1000 ? 1 : 0).replace(/\.0$/, '')}k` : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-16 relative">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`anim-fade-up anim-delay-${idx + 1} relative group text-center p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:border-indigo-500/20 transition-all duration-300 ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <dd className="text-3xl md:text-4xl font-black tracking-tight text-gradient bg-gradient-to-b from-foreground to-foreground/50 relative">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </dd>
              <dt className="text-xs font-medium text-foreground/40 mt-2 uppercase tracking-wider">{stat.name}</dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
