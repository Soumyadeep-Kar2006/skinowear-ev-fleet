import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SustainabilitySection from './components/SustainabilitySection';
import FleetSection from './components/FleetSection';
import ImpactSection from './components/ImpactSection';
import FutureSection from './components/FutureSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(0.33);
    };
  }, []);

  return (
    <div className="relative">
      <CanvasBackground />
      <Navbar />
      <Hero />
      <AboutSection />
      <SustainabilitySection />
      <FleetSection />
      <ImpactSection />
      <FutureSection />
      <CTASection />
      <Footer />
    </div>
  );
}
