import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | BharatBridge',
  description: 'Get in touch with BharatBridge — India\'s #1 B2B Export Marketplace.',
};

const CONTACT_ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    ),
    label: 'Email',
    value: 'hello@bharatbridge.com',
    href: 'mailto:hello@bharatbridge.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    ),
    label: 'Phone / WhatsApp',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    ),
    label: 'Office',
    value: 'Secunderabad, Telangana, India — 500003',
    href: null,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
    label: 'Business Hours',
    value: 'Mon – Sat, 9:00 AM – 7:00 PM IST',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#1E3A5F] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">We're here to help</p>
          <h1 className="text-4xl font-black mb-4">Contact Us</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Have a sourcing question or want to list your products? Reach out to our team.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-[#1E3A5F] hover:text-orange-500 transition">{item.value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gradient-to-br from-[#1E3A5F] to-[#16304F] rounded-2xl text-white">
              <h3 className="font-bold mb-2">Are you a buyer?</h3>
              <p className="text-blue-200 text-sm mb-4">Submit a sourcing inquiry and get quotes from verified Indian exporters.</p>
              <Link href="/inquiry" className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
                Post a Buying Request
              </Link>
            </div>
          </div>

          {/* Quick contact form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#1E3A5F] mb-6">Send a Message</h2>
            <form className="space-y-4" action="mailto:hello@bharatbridge.com" method="post" encType="text/plain">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Your Name</label>
                  <input type="text" name="name" placeholder="John Smith" className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Your Email</label>
                  <input type="email" name="email" placeholder="you@company.com" className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Subject</label>
                <input type="text" name="subject" placeholder="How can we help?" className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Message</label>
                <textarea name="message" rows={5} placeholder="Tell us how we can help you..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#1E3A5F] hover:bg-[#16304F] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
