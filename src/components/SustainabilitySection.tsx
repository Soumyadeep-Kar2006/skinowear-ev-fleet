import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: '50+', label: 'Tons of leather waste upcycled annually' },
  { value: '25', label: 'Electric vehicles in our fleet' },
  { value: '80%', label: 'Reduction in fleet carbon emissions' },
];

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children as gsap.TweenTarget,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sustainability"
      className="relative z-10 flex flex-col items-center px-6 py-32 md:py-44"
    >
      <div ref={contentRef} className="max-w-4xl text-center p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-16">
        <p className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs uppercase tracking-[0.2em] text-[#004d00] font-semibold">
            Sustainability
          </span>
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#F0F0F0] mb-8">
          Transforming waste
          <br />
          <span className="text-[#39FF14]">into value</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[#E5E7EB] max-w-2xl mx-auto font-semibold">
          We turn industrial by-products into premium leather goods and power
          our fleet with clean electric vehicles. Every step is designed to
          minimize waste, maximize resource efficiency, and reduce our
          environmental footprint.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm p-8 text-center"
          >
            <div className="font-serif text-5xl text-[#004d00] mb-3 font-bold">{m.value}</div>
            <div className="text-sm text-[#111827] leading-relaxed">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
