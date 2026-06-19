import { useEffect, useRef } from 'react';

export function useScrollProgress(onProgress: (p: number) => void) {
  const rafId = useRef(0);

  useEffect(() => {
    function tick() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      onProgress(p);
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [onProgress]);
}
