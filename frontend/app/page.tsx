import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import TrendingProjects from '@/components/TrendingProjects';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <FeatureCards />
      <HowItWorks />
      <TrendingProjects />
      <CTA />
      <Footer />
    </div>
  );
}
