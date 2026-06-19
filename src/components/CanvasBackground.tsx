import { useEffect, useRef, useCallback, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const TOTAL_FRAMES = 139;
const PATH = '/SKINOWEAR bg sequence/ezgif-frame-';

function pad(n: number): string {
  return String(n).padStart(3, '0');
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = cw / ch;

  let sx: number, sy: number, sw: number, sh: number;
  if (imgRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sh = img.naturalHeight;
    sx = (img.naturalWidth - sw) * 0.35;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = img.naturalWidth / canvasRatio;
    sx = 0;
    sy = 0;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(false);
  const currentFrameRef = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';

      const idx = currentFrameRef.current;
      if (idx >= 0 && loadedRef.current) {
        const img = framesRef.current[idx];
        if (img) {
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          drawImageCover(ctx!, img, canvas!.width, canvas!.height);
        }
      }
    }
    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const imgs: (HTMLImageElement | null)[] = [];
    const promises: Promise<void>[] = [];

    // load first frame immediately so something shows fast
    const firstImg = new Image();
    firstImg.src = PATH + pad(1) + '.jpg';

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      promises.push(
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => { imgs[i] = img; resolve(); };
          img.onerror = () => { imgs[i] = null; resolve(); };
          img.src = PATH + pad(i + 1) + '.jpg';
        })
      );
    }
    Promise.all(promises).then(() => {
      framesRef.current = imgs;
      loadedRef.current = true;

      // render the frame for the current scroll position immediately on load
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      const frameIdx = Math.round(p * (TOTAL_FRAMES - 1));
      currentFrameRef.current = frameIdx;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = imgs[frameIdx];
        if (ctx && img) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawImageCover(ctx, img, canvas.width, canvas.height);
        }
      }

      setReady(true);
    });
  }, []);

  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[frameIdx];
    if (!img) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImageCover(ctx, img, canvas.width, canvas.height);
  }, []);

  const onProgress = useCallback((p: number) => {
    if (!loadedRef.current) return;
    const frameIdx = Math.round(p * (TOTAL_FRAMES - 1));
    if (frameIdx !== currentFrameRef.current) {
      currentFrameRef.current = frameIdx;
      renderFrame(frameIdx);
    }
  }, [renderFrame]);

  useScrollProgress(onProgress);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform"
      style={{ background: '#000000', opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease', transform: 'translateZ(0)' }}
    />
  );
}
