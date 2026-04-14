import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-background pt-16 pb-8 text-center md:text-left">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block text-2xl font-bold tracking-tighter mb-6">
              Dev<span className="text-primary">Meet</span>
            </Link>
            <p className="text-foreground/40 text-sm leading-relaxed pr-4">
              The premier ecosystem for developers, designers, and creators to form teams, build projects, and win hackathons.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-foreground/50">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Explore Talent</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Find Projects</Link></li>
              <li><Link href="/hackathons" className="hover:text-primary transition-colors">Hackathons</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-foreground/50">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/guidelines" className="hover:text-primary transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-foreground/50">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-foreground/5 text-sm text-foreground/40">
          <p>&copy; {new Date().getFullYear()} DevMeet. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
