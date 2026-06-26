import { client, urlFor } from "../../lib/sanity";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 1. Fungsi buat narik data SATU produk dari Sanity berdasarkan slug-nya
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const product = await client.fetch(query, { slug });
  return product;
}

// 2. Komponen Halaman Detail (UPDATE: params sekarang promise di Next.js 15)
export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Tunggu parameter URL-nya siap (wajib di Next.js 15)
  const resolvedParams = await params;

  // Tunggu data ditarik dari CMS
  const product = await getProduct(resolvedParams.slug);

  // Kalau produknya nggak ada, tampilin pesan error yang informatif
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-32 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-4 font-(family-name:--font-space-grotesk)">
          404
        </h1>
        <p className="text-2xl font-bold font-(family-name:--font-space-grotesk) text-indigo-600 mb-6">
          Oops! Produk tidak ditemukan 😭
        </p>
        <div className="bg-white p-6 rounded-xl border border-gray-200 max-w-md mb-8 shadow-sm">
          <p className="text-gray-600 text-sm">
            <strong>Pesan Developer:</strong> Kalau lu lihat halaman ini, berarti URL yang lu klik adalah: <br />
            <span className="text-red-500 font-mono bg-red-50 px-2 py-1 rounded mt-2 inline-block">/Products/{resolvedParams.slug}</span>
            <br /><br />
            Silakan cek Sanity Studio, pastikan produk ini punya isi di kolom <strong>Slug</strong> dan tidak bernama "undefined".
          </p>
        </div>
        <Link
          href="/Products"
          className="bg-black text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-indigo-600 transition-all uppercase tracking-wider font-(family-name:--font-space-grotesk)"
        >
          Kembali ke Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Tombol Back */}
        <Link
          href="/Products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Kembali ke Products
        </Link>

        {/* Layout Utama: Kiri Gambar, Kanan Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Kolom Kiri: Gambar Produk */}
          {/* PERUBAHAN: p-8 jadi p-4 md:p-8, sticky jadi md:sticky, tambah mb-6 md:mb-0 */}
          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100 md:sticky md:top-32 overflow-hidden mb-6 md:mb-0">
            {Array.isArray(product.image) && product.image.length > 0 && product.image[0] ? (
              <img
                src={urlFor(product.image[0]).url()}
                alt={product.name || 'Product Image'}
                className="w-full h-auto object-contain md:object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
                No Image Available
              </div>
            )}
          </div>

          {/* Kolom Kanan: Detail Produk */}
          <div className="flex flex-col">
            <div className="mb-2 inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest rounded-sm w-max">
              Authentic Guaranteed
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-(family-name:--font-space-grotesk) uppercase tracking-tight">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-indigo-600 mb-6 font-(family-name:--font-space-grotesk)">
              Rp {product.price?.toLocaleString("id-ID")}
            </p>

            <div className="w-full h-px bg-gray-200 mb-6"></div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.details || "Belum ada deskripsi untuk produk ini. Tapi percayalah, sepatu ini bakal bikin langkah lu makin hype."}
            </p>

            {/* Placeholder Pilihan Ukuran */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Pilih Ukuran (EU)</h3>
              <div className="flex flex-wrap gap-3">
                {['40', '41', '42', '43', '44'].map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 rounded-md border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all focus:border-indigo-600 focus:bg-indigo-50"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Add to Cart */}
            <button className="w-full bg-black text-white flex items-center justify-center gap-3 py-5 rounded-md font-bold text-lg hover:bg-indigo-600 transition-all duration-300 uppercase tracking-wider font-(family-name:--font-space-grotesk) shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1">
              <ShoppingCart size={22} />
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}