import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
      tl.fromTo(
        btnRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen"
      style={{ paddingTop: 'calc(8rem)', paddingBottom: '10rem' }}
    >
      <div className="max-w-3xl w-full p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <h1
          ref={titleRef}
          className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-7xl font-normal text-[#F0F0F0]"
          style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Driving Sustainability.{' '}
          <span className="text-[#39FF14]">Reducing Waste.</span>
          <br />
          <span className="text-[#39FF14]">Building a Greener Future.</span>
        </h1>

        <p
        ref={subtitleRef}
        className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#E5E7EB]"
        >
          
        </p>

        <a
          ref={btnRef}
          href="#cta"
          className="inline-flex items-center rounded-full px-14 py-5 text-base font-medium mt-12 bg-black text-white no-underline transition-transform duration-200 hover:scale-[1.03]"
        >
          Begin Journey
        </a>
      </div>
    </section>
  );
}
