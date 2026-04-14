"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('userLoggedIn', 'true');
      window.dispatchEvent(new Event('auth-change'));
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <div className="glass-card p-10 w-full max-w-md mx-4 mt-20 relative z-10 border border-foreground/10 shadow-[0_0_50px_rgba(109,40,217,0.2)]">
        <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Welcome Back</h2>
        <p className="text-foreground/50 mb-8 text-sm">Resume building where you left off.</p>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full bg-surface border border-foreground/10 rounded-lg py-3 px-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="neo@matrix.com"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full bg-surface border border-foreground/10 rounded-lg py-3 px-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-bold bg-foreground text-background hover:bg-foreground/90 transition-all mt-4 neon-border disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                Authenticating...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-foreground/50">
          Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Join the hub</Link>
        </div>
      </div>
    </div>
  );
}
