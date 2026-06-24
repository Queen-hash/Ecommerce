import { client } from './lib/sanity'; // Path diperbarui menyesuaikan struktur lu

// Ini Interface-nya: Ngasih tau TypeScript bentuk data produk lu kayak gimana
interface Product {
  _id: string;
  name: string;
  price: number;
  details: string;
  slug: {
    current: string;
  };
}

// Fungsi untuk narik data dari Sanity CMS
async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    details,
    slug
  }`;
  
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Di sini kita kasih tau kalau 'product' itu menggunakan tipe 'Product' */}
        {products.map((product: Product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-sm bg-white text-black">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 my-2">{product.details || 'Belum ada deskripsi.'}</p>
            <p className="text-emerald-600 font-bold">
              Rp {product.price?.toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}