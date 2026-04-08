"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-8 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-white/80">Platform v2.0 is live! Explore new hackathons</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            Find your team. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Build your future.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl">
            A collaboration ecosystem where builders, developers, designers, and creators connect to build game-changing projects, startups, and hackathons.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
            <Link href="/explore">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-white text-black hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Explore Talent <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/projects/new">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold glass-card border flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                Post a Project <Code size={18} />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
