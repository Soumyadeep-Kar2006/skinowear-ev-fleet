import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: '+', label: 'Tons of waste diverted from landfill', prefix: '' },
  { value: 25, suffix: '', label: 'Electric vehicles on the road', prefix: '' },
  { value: 120, suffix: '+', label: 'Tons of CO₂ reduced annually', prefix: '' },
  { value: 95, suffix: '%', label: 'Customer satisfaction rate', prefix: '' },
];

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const duration = 2000;
  const start = performance.now();
  function update(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children as gsap.TweenTarget,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );

      countersRef.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            if (animated.current) return;
            animated.current = true;
            const stat = STATS[i];
            const numEl = numRefs.current[i];
            if (numEl) animateCounter(numEl, stat.value, stat.suffix);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative z-10 flex flex-col items-center px-6 py-32 md:py-44"
    >
      <div ref={contentRef} className="max-w-4xl text-center p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-16">
        <p className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs uppercase tracking-[0.2em] text-[#004d00] font-semibold">
            Our Impact
          </span>
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#F0F0F0] mb-8">
          Real impact,
          <br />
          <span className="text-[#39FF14]">measurable change</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            ref={(el) => { countersRef.current[i] = el; }}
            className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-sm p-8 text-center"
          >
            <div
              ref={(el) => { numRefs.current[i] = el; }}
              className="font-serif text-4xl md:text-5xl text-[#39FF14] mb-3"
            >
              0{s.suffix}
            </div>
            <div className="text-sm text-[#111827] leading-relaxed">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
