import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#cta' },
];

export default function Navbar({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const onScroll = useCallback(() => {
    const scrollY = lenisRef.current?.scroll ?? window.scrollY;
    setScrolled(scrollY > 60);

    const sections = NAV_LINKS.map((l) => document.querySelector(l.href));
    const scrollPos = scrollY + 120;
    let current = '#hero';
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i];
      if (el && el.getBoundingClientRect().top + scrollY <= scrollPos) {
        current = NAV_LINKS[i].href;
        break;
      }
    }
    setActive(current);
  }, [lenisRef]);

  useEffect(() => {
    const rafId = requestAnimationFrame(function tick() {
      onScroll();
      requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(rafId);
  }, [onScroll]);

  useEffect(() => {
    const idx = NAV_LINKS.findIndex((l) => l.href === active);
    if (idx >= 0 && linkRefs.current[idx]) {
      const el = linkRefs.current[idx]!;
      const parent = navRef.current;
      if (parent) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
      }
    }
  }, [active]);

  function handleClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[40] w-[92%] max-w-[720px] transition-all duration-400 ${
          scrolled ? 'scale-[0.97]' : ''
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 py-2 md:px-5 md:py-1.5 rounded-full border transition-all duration-400 ${
            scrolled
              ? 'bg-white/20 backdrop-blur-2xl border-white/30 shadow-xl'
              : 'bg-white/10 backdrop-blur-xl border-white/20'
          }`}
        >
          <button
            onClick={() => handleClick('#hero')}
            className="font-serif text-xl md:text-2xl tracking-tight text-[#111827]"
          >
            SKINOWEAR<sup className="text-[0.5em] align-super">®</sup>
          </button>

          <div ref={navRef} className="hidden md:flex items-center gap-2 relative">
            <div
              className="absolute top-0 bottom-0 rounded-full bg-[#39FF14]/40 transition-all duration-150"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                onClick={() => handleClick(link.href)}
                className={`relative z-10 px-3 py-1.5 font-mono text-xs tracking-wider font-bold transition-colors duration-200 ${
                  active === link.href
                    ? 'text-[#000000]'
                    : 'text-[#000000] hover:text-[#000000]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[3px] rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-[2px] bg-black rounded transition-all duration-300 ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`block w-4 h-[2px] bg-black rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-[2px] bg-black rounded transition-all duration-300 ${menuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[30] bg-black/60 backdrop-blur-md transition-all duration-400 md:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-white/90 backdrop-blur-xl border-l border-black/5 p-8 pt-24 flex flex-col gap-1 transition-transform duration-400 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`px-4 py-3 rounded-xl text-[15px] text-left transition-all ${
                  active === link.href
                    ? 'text-[#111827] font-medium bg-black/5'
                    : 'text-[#111827] hover:text-[#111827] hover:bg-black/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-black/5 my-3" />
          <button
            onClick={() => handleClick('#cta')}
            className="px-4 py-3 rounded-xl bg-black text-white text-center font-medium text-sm"
          >
            Begin Journey
          </button>
        </div>
      </div>
    </>
  );
}
