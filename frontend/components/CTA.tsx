"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-t-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto glass-card p-12 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Internal gradient sweep */}
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-[pulse_3s_ease-in-out_infinite] -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-white/80 font-medium">Join the revolution</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
            Ready to build <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              something amazing?
            </span>
          </h2>

          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Stop waiting for the perfect team. Connect with top-tier builders today and turn your ideas into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-white text-black hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Create Free Profile <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
