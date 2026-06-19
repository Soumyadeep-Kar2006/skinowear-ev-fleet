import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { name: 'Daily Commuter Service', tag: 'Urban Transit', desc: 'Reliable point-to-point electric transport across key routes in Kolkata, serving daily commuters with affordable fares and zero emissions.' },
  { name: 'Last-Mile Connectivity', tag: 'First & Last Mile', desc: 'Bridging the gap between public transit hubs and final destinations with our compact EV fleet, reducing wait times and travel costs.' },
  { name: 'Corporate Shuttles', tag: 'Corporate', desc: 'Dedicated electric shuttle services for businesses, offering employees a cost-effective and eco-friendly commute while lowering your carbon footprint.' },
  { name: 'Cargo & Logistics', tag: 'Logistics', desc: 'Electric cargo vehicles for intra-city goods movement, combining lower operating costs with reliable delivery schedules.' },
];

export default function FleetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children as gsap.TweenTarget,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
      cardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className="relative z-10 flex flex-col items-center px-6 py-32 md:py-44"
    >
      <div ref={contentRef} className="max-w-4xl text-center p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-16">
        <p className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs uppercase tracking-[0.2em] text-[#004d00] font-semibold">
            Fleet / EV Services
          </span>
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#F0F0F0] mb-8">
          Reliable EV transportation
          <br />
          <span className="text-[#39FF14]">serving Kolkata</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full">
        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm p-8"
          >
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-black/10 text-[#111827] mb-5">
              {s.tag}
            </span>
            <h3 className="font-serif text-3xl text-[#111827] mb-4">{s.name}</h3>
            <p className="text-sm text-[#111827] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
