import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: '2025', title: 'Launch EV Fleet in Kolkata', desc: 'Deploying our initial fleet of electric vehicles to serve key routes across the city.' },
  { year: '2026', title: 'Expand City Routes', desc: 'Scaling operations to cover additional neighbourhoods and transit corridors in Kolkata.' },
  { year: '2027', title: 'Leather Recycling Program', desc: 'Introducing comprehensive recycling for post-industrial leather waste across our manufacturing unit.' },
  { year: '2028', title: 'Carbon-Neutral Operations', desc: 'Achieving carbon neutrality across both our manufacturing and EV transportation divisions.' },
];

export default function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children as gsap.TweenTarget,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="future"
      className="relative z-10 flex flex-col items-center px-6 py-32 md:py-44"
    >
      <div ref={contentRef} className="max-w-4xl text-center p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-16">
        <p className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs uppercase tracking-[0.2em] text-[#004d00] font-semibold">
            Future / Vision
          </span>
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#F0F0F0] mb-8">
          Expanding sustainable
          <br />
          <span className="text-[#39FF14]">transportation</span>
        </h2>
      </div>

      <div className="max-w-3xl w-full space-y-8">
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-6 rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm"
          >
            <div className="font-serif text-3xl text-[#111827] shrink-0">{m.year}</div>
            <div>
              <h3 className="font-serif text-2xl text-[#111827] mb-2">{m.title}</h3>
              <p className="text-sm text-[#111827] leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
