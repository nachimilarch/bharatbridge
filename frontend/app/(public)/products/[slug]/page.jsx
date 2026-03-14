import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import InquiryForm from '@/components/inquiry/InquiryForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${API_URL}/api/v1/products/${params.slug}`);
    if (!res.ok) return { title: 'Product Not Found' };
    const { data } = await res.json();
    return {
      title: `${data.name} | BharatBridge`,
      description: data.description?.substring(0, 160),
      openGraph: { images: data.images?.[0]?.url ? [`${API_URL}${data.images[0].url}`] : [] },
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductDetailPage({ params }) {
  let product;
  try {
    const res = await fetch(`${API_URL}/api/v1/products/${params.slug}`, { next: { revalidate: 1800 } });
    if (!res.ok) notFound();
    const { data } = await res.json();
    product = data;
  } catch {
    notFound();
  }

  const price = product.price
    ? `$${Number(product.price).toLocaleString()} / ${product.unit || 'unit'}`
    : 'Price on request';
  const moq = product.minOrderQty
    ? `${product.minOrderQty} ${product.unit || 'units'}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1E3A5F] transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1E3A5F] transition">Products</Link>
          {product.category && <><span>/</span><Link href={`/products?category=${product.category.slug}`} className="hover:text-[#1E3A5F] transition">{product.category.name}</Link></>}
          <span>/</span>
          <span className="text-slate-700 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative bg-slate-100 rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {product.images?.[0]?.url ? (
                <Image
                  src={product.images[0].url.startsWith('http') ? product.images[0].url : `${API_URL}${product.images[0].url}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw,50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><span className="text-7xl opacity-30">📦</span></div>
              )}
              {product.isFeatured && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative bg-slate-100 rounded-xl overflow-hidden" style={{ aspectRatio: '1' }}>
                    <Image
                      src={img.url.startsWith('http') ? img.url : `${API_URL}${img.url}`}
                      alt={`${product.name} ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <Link href={`/products?category=${product.category.slug}`} className="text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-orange-600 transition">
                {product.category.icon} {product.category.name}
              </Link>
            )}
            <h1 className="text-3xl font-black text-[#1E3A5F] mt-2 mb-4 leading-tight">{product.name}</h1>

            {/* Price & MOQ */}
            <div className="flex items-center gap-6 mb-6 p-4 bg-[#1E3A5F]/5 rounded-2xl">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Price</p>
                <p className="text-2xl font-black text-[#1E3A5F]">{price}</p>
              </div>
              {moq && (
                <div className="border-l border-slate-200 pl-6">
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Min. Order Qty</p>
                  <p className="text-lg font-bold text-slate-700">{moq}</p>
                </div>
              )}
            </div>

            {/* Vendor */}
            {product.vendor && (
              <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Exporter</p>
                  <p className="font-bold text-[#1E3A5F]">{product.vendor.companyName}</p>
                  {product.vendor.city && <p className="text-xs text-slate-500">{product.vendor.city}, India</p>}
                </div>
                {product.vendor.isVerified && (
                  <span className="ml-auto flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    Verified
                  </span>
                )}
              </div>
            )}

            {/* Countries */}
            {product.productCountries?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">🚫 Ships To</p>
                <div className="flex flex-wrap gap-2">
                  {product.productCountries.map(({ country }) => (
                    <span key={country.id} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {country.flagEmoji} {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <span key={t} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              href={`/inquiry?product=${product.slug}`}
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-4 rounded-2xl transition text-lg"
            >
              📧 Get Quote & Inquiry
            </Link>
          </div>
        </div>

        {/* Description + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {product.description && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-[#1E3A5F] mb-3">Product Description</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>
            )}

            {product.specifications && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-[#1E3A5F] mb-3">Specifications</h2>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{product.specifications}</div>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Send Inquiry</h2>
            <InquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
