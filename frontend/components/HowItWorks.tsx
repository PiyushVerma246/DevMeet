"use client";
import { UserCircle, Search, Rocket } from 'lucide-react';
import { useInView } from './useInView';

const steps = [
  {
    id: 1,
    icon: <UserCircle className="w-8 h-8 text-primary" />,
    title: 'Create Your Proof of Work',
    description: 'Connect your GitHub, highlight your best repos, and let your code speak for you. Add your tech stack and availability.',
  },
  {
    id: 2,
    icon: <Search className="w-8 h-8 text-accent" />,
    title: 'Find Your Next Squad',
    description: 'Browse curated projects matching your skills, or post your own idea and watch the applications roll in from vetted builders.',
  },
  {
    id: 3,
    icon: <Rocket className="w-8 h-8 text-pink-500" />,
    title: 'Build and Launch',
    description: 'Hop into a real-time project room, align your goals, and start pushing code. Win hackathons and build the future.',
  },
];

export default function HowItWorks() {
  const [ref, isVisible] = useInView();

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            How DevMeet Works
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Stop struggling to find reliable teammates. We&apos;ve streamlined the process from connection to deployment.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative" ref={ref}>
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`anim-fade-up anim-delay-${idx + 1} flex-1 relative ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-8 border border-foreground/10 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent z-0" />
                  <div className="z-10 bg-background/80 p-4 rounded-full backdrop-blur-md">
                    {step.icon}
                  </div>
                  {/* Step ID badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold shadow-lg border border-foreground/20">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground/90">{step.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-base max-w-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
