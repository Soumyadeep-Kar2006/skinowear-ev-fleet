import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasBackground from './components/CanvasBackground';
import LoadingScreen from './components/LoadingScreen';
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
  const scrollProgressRef = useRef(0);
  const [loading, setLoading] = useState(true);

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

    lenis.on('scroll', (l) => {
      scrollProgressRef.current = l.progress;
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 50);

    return () => {
      clearTimeout(refreshTimer);
      lenis.destroy();
      gsap.ticker.lagSmoothing(0.33);
    };
  }, []);

  return (
    <>
      {createPortal(<CanvasBackground progressRef={scrollProgressRef} onReady={() => setLoading(false)} />, document.body)}
      <LoadingScreen visible={loading} />
      <div className="relative">
        <Navbar lenisRef={lenisRef} />
        <Hero />
        <AboutSection />
        <SustainabilitySection />
        <FleetSection />
        <ImpactSection />
        <FutureSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
