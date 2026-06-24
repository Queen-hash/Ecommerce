import { client, urlFor } from '../lib/sanity';

// Interface di-update buat nerima data gambar
interface Product {
  _id: string;
  name: string;
  price: number;
  details: string;
  slug: {
    current: string;
  };
  image: any; // Tambahan tipe data gambar
}

async function getProducts() {
  // Query GROQ di-update buat narik field 'image'
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    details,
    slug,
    image 
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    // Background diubah jadi putih keabu-abuan biar lebih clean
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-32 pb-8 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Katalog Produk</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8 gap-4">
          {products.map((product: Product) => (
            <div key={product._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              
              {/* Logika untuk nampilin gambar kalau gambarnya ada di Sanity */}
              {product.image && product.image[0] ? (
                <img 
                  src={urlFor(product.image[0]).url()} 
                  alt={product.name} 
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.details || 'Belum ada deskripsi.'}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-emerald-600 font-bold text-lg">
                    Rp {product.price?.toLocaleString('id-ID')}
                  </p>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}