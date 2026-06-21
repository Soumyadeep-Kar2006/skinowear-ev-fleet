import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 137;

function pad(n: number) {
  return String(n).padStart(3, '0');
}

export default function CanvasBackground({ progressRef, onReady }: { progressRef: React.MutableRefObject<number>; onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${pad(i)}.jpg`;
      imgs.push(img);
    }

    const cvs = canvas;
    const c = ctx;

    function resize() {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    }

    function drawFrame(index: number) {
      const img = imgs[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = cvs.width;
      const ch = cvs.height;
      if (cw === 0 || ch === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const imgAspect = iw / ih;
      const canvasAspect = cw / ch;
      let sx: number, sy: number, sw: number, sh: number;
      if (imgAspect > canvasAspect) {
        sh = ih;
        sw = sh * canvasAspect;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        sw = iw;
        sh = sw / canvasAspect;
        sx = 0;
        sy = (ih - sh) / 2;
      }
      c.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }

    resize();
    window.addEventListener('resize', resize);

    let frameIndex = -1;

    function tryShowFirst() {
      const first = imgs[0];
      if (first && first.complete && first.naturalWidth > 0) {
        drawFrame(0);
        frameIndex = 0;
        onReady?.();
        return true;
      }
      return false;
    }

    if (!tryShowFirst()) {
      imgs[0].onload = () => {
        if (document.contains(cvs)) {
          tryShowFirst();
        }
      };
      tryShowFirst();
    }

    let fallbackTimer = setTimeout(() => onReady?.(), 3000);

    let rafId: number;
    function tick() {
      const p = progressRef.current;
      const i = Math.round(p * (TOTAL_FRAMES - 1));
      if (i !== frameIndex) {
        frameIndex = i;
        drawFrame(i);
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      clearTimeout(fallbackTimer);
    };
  }, [progressRef, onReady]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: '#000' }}
    />
  );
}
