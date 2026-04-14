"use client";
import { useInView } from './useInView';

const stats = [
  { id: 1, name: 'Active Builders', value: '25k+' },
  { id: 2, name: 'Projects Shipped', value: '8,500+' },
  { id: 3, name: 'Hackathons Teamed', value: '1,200+' },
  { id: 4, name: 'Lines of Code', value: '50M+' },
];

export default function Stats() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-12 border-y border-foreground/5 bg-foreground/[0.02]">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`anim-fade-up anim-delay-${idx + 1} flex flex-col items-center justify-center text-center ${isVisible ? 'is-visible' : ''}`}
            >
              <dt className="text-sm font-medium text-foreground/50 mb-2">{stat.name}</dt>
              <dd className="text-4xl font-extrabold tracking-tight neon-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {stat.value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
