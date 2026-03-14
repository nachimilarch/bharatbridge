export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <div className="page-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">About BharatBridge</h1>
        <p className="text-lg text-gray-600 mb-6">
          BharatBridge is India's premier B2B export marketplace, connecting verified Indian exporters with international buyers across 50+ countries.
        </p>
        <div className="prose prose-gray max-w-none">
          <h2>Our Mission</h2>
          <p>To bridge the gap between India's world-class manufacturers and global buyers by providing a trusted, transparent, and efficient marketplace for international trade.</p>
          <h2>How We Work</h2>
          <p>We are a lead generation platform. Buyers browse products and submit inquiries. Our team verifies vendors through a KYC process and facilitates introductions. All transactions and negotiations happen directly between buyers and vendors.</p>
          <h2>Why Choose BharatBridge</h2>
          <ul>
            <li>All vendors are KYC verified with valid IEC codes</li>
            <li>Products across 20+ major export categories</li>
            <li>Multi-currency pricing with live exchange rates</li>
            <li>Dedicated team to support inquiry-to-deal conversion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
