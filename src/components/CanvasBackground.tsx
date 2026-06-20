import { useEffect, useRef, useCallback, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  cw: number,
  ch: number
) {
  const iw = video.videoWidth;
  const ih = video.videoHeight;
  if (!iw || !ih) return;

  const imgRatio = iw / ih;
  const canvasRatio = cw / ch;

  let sx: number, sy: number, sw: number, sh: number;
  if (imgRatio > canvasRatio) {
    sw = ih * canvasRatio;
    sh = ih;
    sx = (iw - sw) * 0.35;
    sy = 0;
  } else {
    sw = iw;
    sh = iw / canvasRatio;
    sx = 0;
    sy = 0;
  }

  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const currentTimeRef = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      const video = videoRef.current;
      if (video && loadedRef.current && video.readyState >= 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageCover(ctx, video, canvas.width, canvas.height);
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    function onMetadata() {
      const v = videoRef.current;
      if (!v) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      v.currentTime = p * v.duration;
      loadedRef.current = true;
      setReady(true);
    }

    video.addEventListener('loadedmetadata', onMetadata);
    return () => video.removeEventListener('loadedmetadata', onMetadata);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onSeeked() {
      const v = videoRef.current;
      const canvas = canvasRef.current;
      if (!v || !canvas || !loadedRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageCover(ctx, v, canvas.width, canvas.height);
    }

    video.addEventListener('seeked', onSeeked);
    return () => video.removeEventListener('seeked', onSeeked);
  }, []);

  const onProgress = useCallback((p: number) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !loadedRef.current || !canvas) return;

    const targetTime = p * video.duration;
    if (Math.abs(targetTime - currentTimeRef.current) < 0.02) return;
    currentTimeRef.current = targetTime;
    video.currentTime = targetTime;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImageCover(ctx, video, canvas.width, canvas.height);
  }, []);

  useScrollProgress(onProgress);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform"
        style={{ background: '#000000', opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease', transform: 'translateZ(0)' }}
      />
      <video ref={videoRef} src="/bg-vid.mp4" muted playsInline preload="auto" style={{ display: 'none' }} />
    </>
  );
}
