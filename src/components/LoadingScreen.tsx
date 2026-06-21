export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="flex flex-col items-center gap-6 px-8 py-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <h1 className="font-serif text-3xl tracking-tight text-[#F0F0F0]">
          SKINOWEAR<sup className="text-[0.5em] align-super text-[#39FF14]">®</sup>
        </h1>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="font-mono text-xs tracking-widest text-white/50 uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
