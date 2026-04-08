"use client";
import { motion } from 'framer-motion';

const stats = [
  { id: 1, name: 'Active Builders', value: '25k+' },
  { id: 2, name: 'Projects Shipped', value: '8,500+' },
  { id: 3, name: 'Hackathons Teamed', value: '1,200+' },
  { id: 4, name: 'Lines of Code', value: '50M+' },
];

export default function Stats() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <dt className="text-sm font-medium text-white/50 mb-2">{stat.name}</dt>
              <dd className="text-4xl font-extrabold tracking-tight neon-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
