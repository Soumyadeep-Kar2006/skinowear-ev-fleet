import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children as gsap.TweenTarget,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 flex flex-col items-center px-6 py-32 md:py-44"
    >
      <div ref={contentRef} className="max-w-4xl text-center p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <p className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs uppercase tracking-[0.2em] text-[#004d00] font-semibold">
            About
          </span>
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#F0F0F0] mb-8">
          Sustainability is
          <br />
          <span className="text-[#39FF14]">our foundation</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[#E5E7EB] max-w-2xl mx-auto font-semibold">
          At SKINOWEAR, sustainability drives everything we do. We operate in
          premium leather manufacturing and electric mobility two sectors
          united by a commitment to reducing waste and carbon emissions.
          Our leather is sourced as a by-product of the meat industry, ensuring
          no animal is raised solely for its hide. We entered the EV sector to
          extend that commitment, replacing fossil-fuel vehicles with clean
          electric transportation across Kolkata.
        </p>
      </div>
    </section>
  );
}
