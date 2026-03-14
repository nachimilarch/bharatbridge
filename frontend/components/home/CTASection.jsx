import Link from 'next/link';

export default function CTASection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f2e 0%, #f97316 100%)' }}
    >
      {/* Background orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-400/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Start Sourcing Today
        </span>
        <h2 className="text-5xl font-black text-white mb-6 leading-tight">
          Ready to Source Premium<br />Indian Products Globally?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Whether you’re a global buyer or an Indian manufacturer —
          BharatBridge connects you directly, handles the paperwork,
          and delivers to your door.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/inquiry"
            className="bg-white text-navy font-black px-10 py-4 rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200">
            Submit Buying Inquiry
          </Link>
          <Link href="/vendor/register"
            className="border-2 border-white text-white font-black px-10 py-4 rounded-full text-lg hover:bg-white hover:text-navy transition-all duration-200">
            Become a Vendor
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
          <span>✅ Free to register</span>
          <span>✅ KYC-verified network</span>
          <span>✅ 24-hour response</span>
          <span>✅ Customs & shipping handled</span>
        </div>
      </div>
    </section>
  );
}
