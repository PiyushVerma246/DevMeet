import Link from 'next/link';
import { Github, Twitter, MessageSquare } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Explore Talent', href: '/explore' },
      { label: 'Find Projects', href: '/projects' },
      { label: 'Hackathons', href: '/hackathons' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Community', href: '/community' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socialLinks = [
  { icon: <Github size={18} />, href: '#', label: 'GitHub' },
  { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <MessageSquare size={18} />, href: '#', label: 'Discord' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-foreground/[0.05] pt-20 pb-10">
      {/* Subtle gradient at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-500/25">
                D
              </div>
              <span className="text-lg font-bold tracking-tight">
                Dev<span className="text-gradient bg-gradient-to-r from-indigo-400 to-purple-400">Meet</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/30 leading-relaxed max-w-xs">
              The premier ecosystem for developers, designers, and creators to form teams,
              build side projects, and win hackathons — together.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 mt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-foreground/[0.08] hover:border-foreground/10 transition-all duration-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-5">{group.title}</h4>
              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/30 hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-foreground/[0.05] gap-4">
          <p className="text-xs text-foreground/20">
            &copy; {new Date().getFullYear()} DevMeet. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-foreground/15">
            <span>Built with</span>
            <span className="text-pink-500/50">♥</span>
            <span>for the builder community</span>
          </div>
          <div className="flex gap-5 text-xs text-foreground/20">
            <Link href="/privacy" className="hover:text-foreground/50 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground/50 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
