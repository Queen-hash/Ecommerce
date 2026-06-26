import { client, urlFor } from '../lib/sanity';
import Link from 'next/link';

// Matiin cache biar setiap lu nambah produk di Sanity langsung muncul
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Product {
  _id: string;
  name: string;
  price: number;
  details: string;
  slug: {
    current: string;
  };
  image: any;
}

async function getProducts() {
  // Hanya narik produk yang udah dipublish (bukan draft)
  const query = `*[_type == "product" && !(_id in path("drafts.**"))] {
    _id,
    name,
    price,
    details,
    slug,
    image 
  }`;

  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-12 md:pt-32 pb-32 md:pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-10 text-center text-gray-900 uppercase tracking-tighter font-(family-name:--font-space-grotesk)">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product: Product) => {
            // Cek apakah slug valid (ada, tidak kosong, tidak undefined)
            const slugValue = product.slug?.current?.trim();
            const hasValidSlug = !!slugValue;

            // Konten dalam kartu (gambar + info)
            const cardContent = (
              <>
                {/* Bagian Gambar + Animasi Hover */}
                {Array.isArray(product.image) && product.image.length > 0 && product.image[0] ? (
                  <div className="overflow-hidden">
                    <img
                      src={urlFor(product.image[0]).url()}
                      alt={product.name || 'Product Image'}
                      className={`w-full h-56 object-cover transition-transform duration-500 ${hasValidSlug ? 'group-hover:scale-105' : ''}`}
                    />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {/* Bagian Judul & Deskripsi */}
                <div className="p-5 pb-0">
                  <h2 className={`text-xl font-semibold mb-2 transition-colors ${hasValidSlug ? 'group-hover:text-indigo-600' : ''}`}>{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.details || 'Belum ada deskripsi.'}
                  </p>
                </div>
              </>
            );

            return (
              <div key={product._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative">

                {/* Badge Coming Soon kalau slug belum ada */}
                {!hasValidSlug && (
                  <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    Coming Soon
                  </div>
                )}

                {/* FIX: Kalau slug valid → Link, kalau nggak → div biasa (biar gak dead-end) */}
                {hasValidSlug ? (
                  <Link href={`/Products/${slugValue}`} className="grow group">
                    {cardContent}
                  </Link>
                ) : (
                  <div className="grow group cursor-default">
                    {cardContent}
                  </div>
                )}

                {/* Bagian Harga dan Tombol (Di luar Link biar gak nimpa) */}
                <div className="p-5 pt-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <p className="text-emerald-600 font-bold text-lg">
                      Rp {product.price?.toLocaleString('id-ID')}
                    </p>

                    <button
                      disabled={!hasValidSlug}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${hasValidSlug ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      {hasValidSlug ? 'Add to Cart' : 'Unavailable'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}