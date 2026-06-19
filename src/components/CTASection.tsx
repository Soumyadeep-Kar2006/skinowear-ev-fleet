import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children as gsap.TweenTarget,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative z-10 flex flex-col items-center px-6 py-32 md:py-44"
    >
      <div ref={contentRef} className="max-w-3xl w-full text-center p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <p className="mb-6">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs uppercase tracking-[0.2em] text-[#004d00] font-semibold">
            Contact
          </span>
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[#F0F0F0] mb-8">
          Interested in sustainable
          <br />
          <span className="text-[#39FF14]">transportation?</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[#E5E7EB] max-w-xl mx-auto mb-12 font-semibold">
          Learn more about our EV fleet services in Kolkata or explore partnership
          opportunities. Let's work together toward a greener future.
        </p>

        <form
          className="max-w-md mx-auto flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const email = emailRef.current?.value;
            const name = nameRef.current?.value;
            const mobile = mobileRef.current?.value;
            if (email) {
              const subject = encodeURIComponent('Inquiry from SKINOWEAR EV Website');
              const body = encodeURIComponent(`Hello SKINOWEAR EV,\n\nI am interested in learning more about your EV fleet services and sustainability initiatives.\n\nName: ${name || 'Not provided'}\nMobile: ${mobile || 'Not provided'}\nEmail: ${email}\n\nPlease reach out to me with more information.\n\nThank you.`);
              window.location.href = `mailto:hello@skinowear.com?subject=${subject}&body=${body}`;
            }
          }}
        >
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter your name"
            className="w-full max-w-sm mx-auto px-4 py-3 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-sm text-[#111827] placeholder:text-[#004d00] outline-none focus:border-black/30 transition-colors"
          />
          <input
            ref={mobileRef}
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full max-w-sm mx-auto px-4 py-3 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-sm text-[#111827] placeholder:text-[#004d00] outline-none focus:border-black/30 transition-colors"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-sm mx-auto px-4 py-3 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-sm text-[#111827] placeholder:text-[#004d00] outline-none focus:border-black/30 transition-colors"
            required
          />
          <button
            type="submit"
            className="w-auto mx-auto rounded-full px-8 py-2.5 text-xs font-medium bg-black text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            Send
          </button>
        </form>

        <div className="flex justify-center gap-4 mt-8">
          <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-[#1877F2] hover:brightness-125 transition-all duration-200" aria-label="Facebook">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-[#E4405F] hover:brightness-125 transition-all duration-200" aria-label="Instagram">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.5 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-[#25D366] hover:brightness-125 transition-all duration-200" aria-label="WhatsApp">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-[#FF0000] hover:brightness-125 transition-all duration-200" aria-label="YouTube">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
