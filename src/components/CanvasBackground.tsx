import { useState } from 'react';

export default function CanvasBackground() {
  const [ready, setReady] = useState(false);

  return (
    <video
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform"
      style={{
        background: '#000000',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.8s ease',
        transform: 'translateZ(0)'
      }}
      src="/bg-vid.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setReady(true)}
    />
  );
}
