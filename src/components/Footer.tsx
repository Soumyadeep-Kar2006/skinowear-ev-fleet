export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/5 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 font-serif text-xl text-[#F0F0F0]">
          SKINOWEAR<sup className="text-[0.5em] align-super">®</sup>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-[#D1D5DB] font-bold">
          &copy; {new Date().getFullYear()} SKINOWEAR. All rights reserved.
        </div>
        <div className="px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-[#D1D5DB] font-bold">
          <span className="font-mono">Designed and developed by <span className="text-[#39FF14]">Soumyadeep Kar</span></span>
        </div>
      </div>
    </footer>
  );
}
