import './globals.css';
import { Inter, Open_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider }     from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar  from '@/components/layout/Navbar';
import Footer  from '@/components/layout/Footer';
import FloatingInquiryButton from '@/components/inquiry/FloatingInquiryButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans', display: 'swap' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bharatbridge.com'),
  title: {
    default:  'BharatBridge — Export Quality Indian Products Worldwide',
    template: '%s | BharatBridge B2B Export Marketplace',
  },
  description: 'BharatBridge connects global buyers with verified Indian exporters. Browse 10,000+ export quality products — spices, textiles, pharmaceuticals, handicrafts and more.',
  keywords: [
    'Indian exporters', 'B2B India export', 'buy from India',
    'Indian spices export', 'Indian textiles wholesale',
    'India trade marketplace', 'export quality Indian products',
    'verified Indian manufacturers', 'global sourcing India',
  ],
  authors:     [{ name: 'BharatBridge', url: 'https://bharatbridge.com' }],
  creator:     'BharatBridge',
  publisher:   'BharatBridge Technologies Pvt. Ltd.',
  openGraph: {
    type:      'website',
    locale:    'en_US',
    siteName:  'BharatBridge',
    title:     'BharatBridge — Export Quality Indian Products Worldwide',
    description: 'Connect with 500+ verified Indian exporters. Browse export quality products for international trade.',
    images:    [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'BharatBridge B2B Export Marketplace' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'BharatBridge — Export Quality Indian Products',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://bharatbridge.com' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#1e3a5f' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        {/* Organization schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'BharatBridge',
          url: 'https://bharatbridge.com',
          logo: 'https://bharatbridge.com/logo.png',
          description: 'India\'s premier B2B export marketplace',
          address: { '@type': 'PostalAddress', addressCountry: 'IN' },
          contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'hello@bharatbridge.com' },
        })}} />
      </head>
      <body className={`font-sans bg-white text-slate-900 antialiased`}>
        <AuthProvider>
          <CurrencyProvider>
            <Navbar />
            <main>{children}</main>
            <FloatingInquiryButton />
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: { background: '#0f172a', color: '#f8fafc', borderRadius: '10px', fontSize: '14px' },
                success: { iconTheme: { primary: '#059669', secondary: '#fff' } },
                error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              }}
            />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
