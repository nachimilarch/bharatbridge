import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  metadataBase: new URL('https://bharatbridge.com'),
  title: {
    default: 'BharatBridge — India\'s #1 B2B Export Marketplace',
    template: '%s | BharatBridge',
  },
  description:
    'BharatBridge connects global buyers with 500+ KYC-verified Indian manufacturers. Source Rice, Spices, Furniture, Chemicals & more. Submit bulk inquiries for direct factory prices.',
  keywords: [
    'B2B India export', 'Indian manufacturers', 'Made in India', 'bulk sourcing India',
    'Basmati rice exporter', 'Indian spices export', 'Indian furniture manufacturer',
    'verified Indian exporters', 'global sourcing India', 'B2B marketplace India',
  ],
  openGraph: {
    type: 'website',
    siteName: 'BharatBridge',
    title: 'BharatBridge — India\'s #1 B2B Export Marketplace',
    description: 'Connect with 500+ verified Indian manufacturers. Source premium Made-in-India products globally.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <AuthProvider>
          <CurrencyProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
