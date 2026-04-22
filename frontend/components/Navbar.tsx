"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(localStorage.getItem('userLoggedIn') === 'true');
    checkLogin();
    window.addEventListener('auth-change', checkLogin);
    return () => window.removeEventListener('auth-change', checkLogin);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const navLinks = [
    { href: '/explore', label: 'Explore' },
    { href: '/projects', label: 'Projects' },
    { href: '/hackathons', label: 'Hackathons' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-background/70 backdrop-blur-2xl border-b border-foreground/5 shadow-lg shadow-background/20'
          : 'py-5 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="anim-entrance text-xl font-bold tracking-tight flex items-center gap-2" style={{ animationName: 'entrance-fade-down', animationDuration: '0.5s' }}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
                D
              </div>
              <span className="text-foreground">Dev<span className="text-gradient bg-gradient-to-r from-indigo-400 to-purple-400">Meet</span></span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="anim-entrance anim-entrance-delay-1 hidden md:flex gap-1 text-sm font-medium" style={{ animationName: 'entrance-fade-down' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="anim-entrance anim-entrance-delay-2 flex gap-3 items-center">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hidden md:block text-sm font-medium hover:text-foreground transition-colors text-foreground/60 px-4 py-2 rounded-full hover:bg-foreground/5">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-5 py-2 rounded-full text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden md:block text-sm font-medium hover:text-foreground transition-colors text-foreground/60 px-4 py-2 rounded-full hover:bg-foreground/5">
                  Sign In
                </Link>
                <Link href="/register">
                  <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
                    Get Started
                  </button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden pt-20">
          <div className="flex flex-col items-center gap-6 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-semibold text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-foreground/10 pt-6 mt-2 flex flex-col gap-4 w-full items-center">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-lg font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="px-8 py-3 rounded-full text-base font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-lg font-medium text-foreground/60" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <button className="px-8 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
