import { useEffect, useRef, useState } from 'react';

const neonGreen = '#39FF14';

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3,
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
              background: neonGreen,
              opacity: 0,
              animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute h-px w-1/4"
            style={{
              top: '40%',
              left: '-10%',
              background: `linear-gradient(90deg, transparent, ${neonGreen}, transparent)`,
              animation: 'energySweep 4s ease-in-out infinite',
              opacity: 0.2,
            }}
          />
        </div>

          <div
            className="relative flex flex-col items-center px-12 py-16 mx-6"
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(57,255,20,0.12)',
              borderRadius: '24px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
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
              style={{ color: neonGreen }}
            >
              ⚡
            </span>
            <p
              className="text-base sm:text-lg font-light tracking-wide"
              style={{ color: '#374151' }}
            >
              Electrifying the Road Ahead
            </p>
          </div>

          <div className="mt-10 w-56 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(57,255,20,0.15)' }}>
            <div
              className="h-full rounded-full"
              style={{
                background: neonGreen,
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
