"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 py-4 px-8 flex justify-between items-center backdrop-blur-md transform-gpu">
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          Dev<span className="text-primary">Meet</span>
        </motion.div>
      </Link>
      
      <motion.ul 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:flex gap-8 text-sm font-medium text-white/70"
      >
        <li className="hover:text-white transition-colors"><Link href="/explore">Explore</Link></li>
        <li className="hover:text-white transition-colors"><Link href="/projects">Projects</Link></li>
        <li className="hover:text-white transition-colors"><Link href="/hackathons">Hackathons</Link></li>
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-4 items-center"
      >
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-sm font-medium hover:text-white transition-colors text-white/70">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="px-5 py-2 rounded-full text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors text-white/70">
              Login
            </Link>
            <Link href="/register">
              <button className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary/80 transition-all neon-border shadow-[0_0_15px_rgba(109,40,217,0.5)]">
                Join Now
              </button>
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
}
