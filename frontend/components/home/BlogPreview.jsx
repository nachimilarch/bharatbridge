import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const ARTICLES = [
  {
    slug:     'top-indian-products-exported-worldwide',
    title:    'Top 10 Indian Products Exported Worldwide in 2025',
    excerpt:  'India exported goods worth $437 billion in FY2024. Discover the top export categories driving India\'s trade growth globally.',
    category: 'Export Trends',
    readTime: '6 min read',
    date:     'March 2025',
    emoji:    '🌐',
    color:    'bg-blue-50',
  },
  {
    slug:     'how-to-import-goods-from-india',
    title:    'Complete Guide: How to Import Goods from India',
    excerpt:  'Step-by-step guide covering import procedures, documentation, Incoterms, payment terms, and compliance for importing from India.',
    category: 'Import Guide',
    readTime: '10 min read',
    date:     'February 2025',
    emoji:    '📦',
    color:    'bg-emerald-50',
  },
  {
    slug:     'best-indian-spice-exporters',
    title:    'Best Indian Spice Exporters: Quality, Pricing & Sourcing',
    excerpt:  'India supplies 75% of the world\'s spices. Learn how to identify reliable spice exporters, negotiate prices, and ensure quality.',
    category: 'Sourcing Guide',
    readTime: '8 min read',
    date:     'January 2025',
    emoji:    '🌶️',
    color:    'bg-red-50',
  },
  {
    slug:     'india-export-market-trends-2025',
    title:    'India Export Market Trends & Opportunities 2025',
    excerpt:  'Analysis of emerging opportunities in Indian exports — from green energy components to technical textiles and organic food.',
    category: 'Market Analysis',
    readTime: '7 min read',
    date:     'December 2024',
    emoji:    '📈',
    color:    'bg-saffron-50',
  },
];

export default function BlogPreview() {
  return (
    <section className="bb-section bg-slate-50">
      <div className="bb-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="bb-section-pill">📚 Export Knowledge</div>
            <h2 className="bb-section-title">India Export Guides & Insights</h2>
            <p className="text-slate-500 mt-2">
              Expert resources for global buyers sourcing from India.
            </p>
          </div>
          <Link href="/blog" className="bb-btn bb-btn-outline bb-btn-sm flex-shrink-0">
            View All Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`}
              className="group bb-card-hover flex flex-col h-full">
              {/* Color header */}
              <div className={`${a.color} p-8 flex items-center justify-center`}>
                <span className="text-5xl">{a.emoji}</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bb-badge bb-badge-new text-[10px]">
                    <Tag size={9} /> {a.category}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {a.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
                  {a.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-50">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {a.readTime}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
