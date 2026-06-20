import { useEffect, useRef, useState } from 'react';

const neonGreen = '#39FF14';
const neonGlow = '0 0 8px rgba(57,255,20,0.4), 0 0 20px rgba(57,255,20,0.15)';

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}));

export default function CanvasBackground() {
  const [videoReady, setVideoReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const readyTimer = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      readyTimer.current = true;
      if (videoReady) setShowContent(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [videoReady]);

  useEffect(() => {
    if (videoReady && readyTimer.current) setShowContent(true);
  }, [videoReady]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/20 backdrop-blur-xl"
        style={{
          opacity: showContent ? 0 : 1,
          transition: 'opacity 0.8s ease',
          pointerEvents: showContent ? 'none' : 'auto',
        }}
      >

        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.size > 2 ? neonGreen : '#ffffff',
              opacity: 0,
              animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: p.size > 2 ? neonGlow : 'none',
            }}
          />
        ))}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute h-px w-1/3"
            style={{
              top: '20%',
              left: '-10%',
              background: `linear-gradient(90deg, transparent, ${neonGreen}, transparent)`,
              animation: 'energySweep 4s ease-in-out infinite',
              opacity: 0.4,
            }}
          />
          <div
            className="absolute h-px w-1/4"
            style={{
              top: '70%',
              right: '-5%',
              background: `linear-gradient(90deg, transparent, ${neonGreen}, transparent)`,
              animation: 'energySweep 5s ease-in-out 1s infinite',
              opacity: 0.3,
            }}
          />
        </div>

        <div
          className="relative flex flex-col items-center px-12 py-16 mx-6"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(57,255,20,0.12)',
            borderRadius: '24px',
            boxShadow: '0 8px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(57,255,20,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${neonGreen}, transparent)`,
              opacity: 0.3,
            }}
          />

          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center"
            style={{
              color: '#0d5c0d',
              letterSpacing: '-2.5px',
              textShadow: '0 0 30px rgba(13,92,13,0.15), 0 0 60px rgba(13,92,13,0.08)',
            }}
          >
            SKINOWEAR
          </h1>

          <p
            className="text-xs sm:text-sm mt-5 tracking-[0.35em] text-center uppercase font-medium"
            style={{ color: '#6b7280' }}
          >
            EV FLEET SERVICES
          </p>

          <div className="flex items-center gap-3 mt-8 pt-7" style={{ borderTop: '1px solid rgba(57,255,20,0.1)' }}>
            <span
              className="text-lg sm:text-xl"
              style={{
                filter: `drop-shadow(0 0 8px ${neonGreen}) drop-shadow(0 0 16px rgba(57,255,20,0.3))`,
              }}
            >
              ⚡
            </span>
            <p
              className="text-base sm:text-lg font-light tracking-wide"
              style={{
                color: '#374151',
                textShadow: `0 0 20px rgba(57,255,20,0.08)`,
              }}
            >
              Electrifying the Road Ahead
            </p>
          </div>

          <div className="mt-10 w-56 relative">
            <div
              className="w-full h-[2px] rounded-full"
              style={{ background: 'rgba(57,255,20,0.12)' }}
            />
            <div
              className="absolute top-0 left-0 h-[2px] rounded-full animate-charge"
              style={{
                background: `linear-gradient(90deg, ${neonGreen}, rgba(57,255,20,0.3))`,
                boxShadow: neonGlow,
                width: '0%',
                animation: 'chargeLine 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform"
        style={{
          background: '#000000',
          transform: 'translateZ(0)',
        }}
        src="/bg-vid.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
      />
    </>
  );
}
