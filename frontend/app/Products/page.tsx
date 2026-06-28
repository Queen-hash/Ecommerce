import { client, urlFor } from '../lib/sanity';
import Link from 'next/link'; 

export const dynamic = 'force-dynamic';

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

export default async function Katalog() { 
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.3),rgba(255,255,255,0))] pt-32 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase font-(family-name:--font-space-grotesk)">
           <span className="text-blue-500">Products</span>
          </h1>
          <div className="h-1 w-20 bg-blue-600 mt-4"></div>
        </div>
        
        {/* Grid: 2 Kolom (Mobile) - 4 Kolom (PC) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: Product) => (
            
            <div 
              key={product._id} 
              className="group bg-[#0f0f11] border border-white/10 hover:border-blue-500/50 rounded-xl overflow-hidden transition-colors duration-300 flex flex-col relative"
            >
              
              <Link href={`/Products/${product.slug.current}`} className="grow flex flex-col relative">
                
                {/* Gambar Produk */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#1a1a1c]">
                  {product.image && product.image[0] ? (
                    <img 
                      src={urlFor(product.image[0]).url()} 
                      alt={product.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-mono uppercase">
                      [ No Image ]
                    </div>
                  )}
                </div>

                {/* Judul, Deskripsi, dan HARGA (Pindah ke bawah) */}
                <div className="p-4 md:p-5 grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm md:text-lg font-bold mb-1 text-zinc-100 uppercase tracking-wide line-clamp-1 font-(family-name:--font-space-grotesk)">
                      {product.name}
                    </h2>
                    <p className="text-zinc-500 text-xs md:text-sm line-clamp-1 mb-3">
                      {product.details || 'Exclusive drop. Grab it fast.'}
                    </p>
                  </div>
                  
                  {/* Harga sekarang ada di bawah deskripsi */}
                  <div className="mt-auto">
                    <p className="text-white font-bold text-sm md:text-lg tracking-wider">
                      Rp {product.price?.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}