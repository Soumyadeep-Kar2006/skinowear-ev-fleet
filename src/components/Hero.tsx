export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen"
      style={{ paddingTop: 'calc(8rem)', paddingBottom: '10rem' }}
    >
      <div className="max-w-3xl w-full p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-7xl font-normal text-[#F0F0F0]"
          style={{
            lineHeight: 0.95,
            letterSpacing: '-2.46px',
            animation: 'heroSlideUp 0.6s ease both',
          }}
        >
          Driving Sustainability.{' '}
          <span className="text-[#39FF14]">Reducing Waste.</span>
          <br />
          <span className="text-[#39FF14]">Building a Greener Future.</span>
        </h1>

        <p
          className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#E5E7EB]"
          style={{ animation: 'heroSlideUp 0.6s ease 0.1s both' }}
        >
          
        </p>

        <a
          href="#cta"
          className="inline-flex items-center rounded-full px-14 py-5 text-base font-medium mt-12 bg-black text-white no-underline transition-transform duration-200 hover:scale-[1.03]"
          style={{ animation: 'heroSlideUp 0.6s ease 0.2s both' }}
        >
          Begin Journey
        </a>
      </div>
    </section>
  );
}
