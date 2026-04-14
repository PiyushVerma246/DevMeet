"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(localStorage.getItem('userLoggedIn') === 'true');
    checkLogin();
    window.addEventListener('auth-change', checkLogin);
    return () => window.removeEventListener('auth-change', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-foreground/5 py-4 px-8 flex justify-between items-center backdrop-blur-md transform-gpu">
      <Link href="/">
        <div className="anim-entrance text-2xl font-bold tracking-tighter" style={{ animationName: 'entrance-fade-down', animationDuration: '0.5s' }}>
          Dev<span className="text-primary">Meet</span>
        </div>
      </Link>
      
      <ul className="anim-entrance anim-entrance-delay-1 hidden md:flex gap-8 text-sm font-medium text-foreground/70" style={{ animationName: 'entrance-fade-down' }}>
        <li className="hover:text-foreground transition-colors"><Link href="/explore">Explore</Link></li>
        <li className="hover:text-foreground transition-colors"><Link href="/projects">Projects</Link></li>
        <li className="hover:text-foreground transition-colors"><Link href="/hackathons">Hackathons</Link></li>
      </ul>

      <div className="anim-entrance anim-entrance-delay-2 flex gap-4 items-center">
        <ThemeToggle />
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-sm font-medium hover:text-foreground transition-colors text-foreground/70">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="px-5 py-2 rounded-full text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium hover:text-foreground transition-colors text-foreground/70">
              Login
            </Link>
            <Link href="/register">
              <button className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-foreground hover:bg-primary/80 transition-all neon-border shadow-[0_0_15px_rgba(109,40,217,0.5)]">
                Join Now
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
