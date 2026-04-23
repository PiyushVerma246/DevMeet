import Hero from '@/components/Hero';
import ScrollCanvas from '@/components/ScrollCanvas';
import Stats from '@/components/Stats';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <ScrollCanvas />
      <FeaturesShowcase />
      <FeatureCards />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
