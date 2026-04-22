import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'DevMeet | Find your team. Build your future.',
  description: 'The collaboration ecosystem where serious builders connect, form squads, and ship together.',
  keywords: ['developer collaboration', 'hackathon teams', 'find co-founders', 'open source', 'devmeet'],
  openGraph: {
    title: 'DevMeet | Find your team. Build your future.',
    description: 'The platform where builders find teammates, ship projects, and win hackathons.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1 relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
