import { notFound } from 'next/navigation';
import Image from 'next/image';
import InquiryForm from '@/components/inquiry/InquiryForm';
import { MapPin, Package, Globe, Tag } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${API_URL}/api/v1/products/${params.slug}`);
    if (!res.ok) return { title: 'Product Not Found' };
    const { data } = await res.json();
    return {
      title: data.name,
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

  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const imageUrl = primaryImage?.url
    ? primaryImage.url.startsWith('http') ? primaryImage.url : `${API_URL}${primaryImage.url}`
    : null;

  return (
    <div className="page-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="card p-4">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
              {imageUrl ? (
                <Image src={imageUrl} alt={product.name} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 66vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((img) => {
                  const thumbUrl = img.url.startsWith('http') ? img.url : `${API_URL}${img.url}`;
                  return (
                    <div key={img.id} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image src={thumbUrl} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-info">{product.category?.name}</span>
              {product.hsCode && <span className="badge badge-neutral">HS: {product.hsCode}</span>}
            </div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              {product.vendor && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {product.vendor.companyName}, {product.vendor.city}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Package size={14} /> MOQ: {product.minOrderQty} {product.unit}
              </span>
            </div>

            {product.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
              </div>
            )}

            {product.specifications && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-2">
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                      <div className="text-sm font-medium text-gray-900">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.productCountries?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
                  <Globe size={15} /> Available for Export To
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.productCountries.map(({ country }) => (
                    <span key={country.id} className="badge badge-neutral">
                      {country.flagEmoji} {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:col-span-1">
          <InquiryForm productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
}
