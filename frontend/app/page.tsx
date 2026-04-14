import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ExplorePreview from '@/components/ExplorePreview';
import TrendingProjects from '@/components/TrendingProjects';
import HackathonPreview from '@/components/HackathonPreview';
import FeatureCards from '@/components/FeatureCards';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <ExplorePreview />
      <TrendingProjects />
      <HackathonPreview />
      <FeatureCards />
      <CTA />
      <Footer />
    </div>
  );
}
