export const metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div className="page-container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">Have questions? Our team is here to help.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📧', label: 'Email', value: 'hello@bharatbridge.com' },
            { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
            { icon: '📍', label: 'Location', value: 'Mumbai, India' },
          ].map((item) => (
            <div key={item.label} className="card p-6">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
              <div className="text-sm text-gray-600">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
