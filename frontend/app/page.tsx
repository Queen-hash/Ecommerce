'use client'

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- PROPS & COMPONENT INTERACTIVE CARD 3D ---
interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl: string;
  title: string;
  description: string;
  price: string;
}

export function InteractiveProductCard({
  className,
  imageUrl,
  logoUrl,
  title,
  description,
  price,
  style,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    cardRef.current.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.transition = "transform 0.4s ease-in-out";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      // Nah, di baris bawah ini gua udah hapus bg-[#0f0f11] biar gambarnya nggak ketutupan lagi
      className={`relative w-full max-w-85 aspect-9/12 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer group transform-3d ${className || ""}`}
      {...props}
    >
      {/* Gambar sepatu (Udah fix nggak nge-zoom pas di hover) */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover rounded-3xl"
        style={{ transform: "translateZ(-20px) scale(1.1)" }}
      />
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />

      <div
        className="absolute inset-0 p-4 md:p-5 flex flex-col"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Header Kaca (Glassmorphism) */}
        <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/10 p-3 md:p-4 backdrop-blur-md shadow-xl">
          <div className="flex flex-col pr-2">
            <h3 className="text-sm md:text-xl font-bold text-white leading-tight font-(family-name:--font-space-grotesk) line-clamp-1">{title}</h3>
            <p className="text-[10px] md:text-xs text-white/70 line-clamp-1">{description}</p>
          </div>
          <img src={logoUrl} alt="Brand Logo" className="h-4 md:h-5 w-auto object-contain opacity-90" />
        </div>

        {/* Harga */}
        <div className="absolute top-21.25 md:top-27 left-4 md:left-5">
          <div className="rounded-full bg-black/60 border border-white/10 px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-sm font-semibold text-white backdrop-blur-md">
            {price}
          </div>
        </div>

        {/* Titik Tiga (Pagination Dots) udah dibalikin lagi */}
        <div className="mt-auto flex w-full justify-center gap-2 pb-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-indigo-400" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- KUMPULAN DATA DUMMY ---
const row1 = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&auto=format&fit=crop",
];

const row2 = [
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=400&auto=format&fit=crop",
];

const row3 = [
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=400&auto=format&fit=crop",
];

const brandLogos = [
  "https://cdn.simpleicons.org/nike/FFFFFF",
  "https://cdn.simpleicons.org/adidas/FFFFFF",
  "https://cdn.simpleicons.org/newbalance/FFFFFF",
  "https://cdn.simpleicons.org/puma/FFFFFF",
  "https://cdn.simpleicons.org/reebok/FFFFFF",
  "https://cdn.simpleicons.org/underarmour/FFFFFF",
];

const dummyHypeDrops = [
  { id: 1, name: "Air Jordan 1 High", description: "Chicago 2015", price: "Rp 2.899.000", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop", logo: "https://cdn.simpleicons.org/nike/FFFFFF" },
  { id: 2, name: "New Balance Aesthetic", description: "green", price: "Rp 1.999.000", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop", logo: "https://cdn.simpleicons.org/newbalance/FFFFFF" },
  { id: 3, name: "Nike Dunk Low", description: "Retro White Black", price: "Rp 1.799.000", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", logo: "https://cdn.simpleicons.org/nike/FFFFFF" },
  { id: 4, name: "Yeezy Boost 350", description: "Zebra V2", price: "Rp 3.599.000", image: "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=800&auto=format&fit=crop", logo: "https://cdn.simpleicons.org/adidas/FFFFFF" },
];

const topBrands = [
  { name: "Nike", logo: "https://cdn.simpleicons.org/nike/FFFFFF", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop" },
  { name: "Adidas", logo: "https://cdn.simpleicons.org/adidas/FFFFFF", image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=800&auto=format&fit=crop" },
  { name: "New Balance", logo: "https://cdn.simpleicons.org/newbalance/FFFFFF", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop" },
  { name: "Puma", logo: "https://cdn.simpleicons.org/puma/FFFFFF", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop" },
];

const MarqueeRow = ({ images, direction }: { images: string[], direction: 'left' | 'right' }) => {
  const duplicatedImages = [...images, ...images]; 
  return (
    <div className={`flex w-max gap-4 my-2 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
      {duplicatedImages.map((src, i) => (
        <img key={i} src={src} alt="Shoe Background" className="w-48 h-32 md:w-64 md:h-40 object-cover rounded-xl opacity-15" />
      ))}
    </div>
  );
};

const LogoMarqueeRow = ({ direction }: { direction: 'left' | 'right' }) => {
  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos]; 
  return (
    <div className={`flex w-max gap-24 items-center my-4 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
      {duplicatedLogos.map((src, i) => (
        <img key={i} src={src} alt="Brand Logo" className="h-8 md:h-12 object-contain opacity-20" />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center h-screen w-full text-center px-4 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 flex flex-col justify-center -rotate-6 scale-125 pointer-events-none">
          <MarqueeRow images={row1} direction="right" />
          <LogoMarqueeRow direction="left" /> 
          <MarqueeRow images={row2} direction="left" />
          <LogoMarqueeRow direction="right" />
          <MarqueeRow images={row3} direction="right" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}  
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto mt-12 px-2"
        >
          <div className="mb-8 inline-flex items-center rounded-sm border border-indigo-500/40 bg-black/40 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-indigo-300 backdrop-blur-md shadow-lg">
            New Drops • Summer Collection 26
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)] font-(family-name:--font-space-grotesk)">
            Step Up <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
              Your Game.
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-medium leading-relaxed">
            Elevate your style with our premium authentic sneakers make a statement that goes beyond trends.
          </p>

          <Link
            href="/Products"
            className="bg-white text-black px-10 py-4 rounded-md font-bold text-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1 uppercase tracking-wider font-(family-name:--font-space-grotesk)"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>

      {/* 2. NEW SECTION: HYPE DROPS (Pake Komponen 3D Lu) */}
      <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-(family-name:--font-space-grotesk)">
              Hype <span className="text-indigo-500">Drops</span>
            </h2>
            <Link href="/Products" className="text-xs md:text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-widest border-b border-zinc-700 hover:border-white transition-colors pb-1">
              View All
            </Link>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 md:gap-6 pb-8 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {dummyHypeDrops.map((item) => (
              <div key={item.id} className="w-[45vw] min-w-42.5 md:w-auto shrink-0 snap-center">
                <InteractiveProductCard 
                  imageUrl={item.image}
                  logoUrl={item.logo}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. SECTION: TOP BRANDS */}
      <section className="py-20 md:py-32 px-4 md:px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-(family-name:--font-space-grotesk)">
              Top <span className="text-indigo-500">Brands</span>
            </h2>
            <div className="h-1 w-16 bg-indigo-600 mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topBrands.map((brand, idx) => (
              <div key={idx} className="relative aspect-4/5 overflow-hidden rounded-xl group cursor-pointer border border-white/10">
                <img 
                  src={brand.image} 
                  alt={`${brand.name} Lifestyle`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/30 transition-colors duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SECTION: CURATED COLLECTIONS */}
      <section className="py-12 md:py-24 px-4 md:px-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          
          <div className="relative aspect-4/3 md:aspect-square overflow-hidden rounded-2xl group cursor-pointer border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop" 
              alt="Performance Running" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 font-(family-name:--font-space-grotesk)">Performance</h3>
              <p className="text-zinc-400 mb-6 max-w-sm text-sm md:text-base">Push your limits with our premium running and athletic collection.</p>
              <button className="self-start px-6 py-3 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-colors rounded-sm">
                Shop Running
              </button>
            </div>
          </div>

          <div className="relative aspect-4/3 md:aspect-square overflow-hidden rounded-2xl group cursor-pointer border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop" 
              alt="Street Classics" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 font-(family-name:--font-space-grotesk)">Street Classics</h3>
              <p className="text-zinc-400 mb-6 max-w-sm text-sm md:text-base">Timeless silhouettes designed for everyday urban exploration.</p>
              <button className="self-start px-6 py-3 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-colors rounded-sm">
                Shop Lifestyle
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. SECTION: MEGA FOOTER (Final Enterprise Version) */}
      <footer className="bg-[#050505] border-t border-white/10 pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
          
          <div className="text-zinc-400 text-[10px] md:text-xs leading-relaxed space-y-4 mb-12">
            <h3 className="text-zinc-200 font-bold uppercase tracking-wider mb-2 font-(family-name:--font-space-grotesk)">Belanja Sneakers & Streetwear Hype di SneakerHead Indonesia</h3>
            <p>SneakerHead Indonesia merupakan destinasi terdepan dalam belanja kultur sneakers dan streetwear online, menyediakan rilis eksklusif dari brand global yang terus bertambah untuk para sneakerhead di seluruh Indonesia. Kami memiliki ribuan kurasi produk yang dijamin 100% autentik.</p>
          </div>

          <div className="border-t border-white/10 mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Pembayaran</h4>
              <div className="flex flex-wrap gap-3">
                <img src="/bca.png" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="BCA" />
                <img src="/mandiri.png" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="Mandiri" />
                <img src="/gopay.png" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="Gopay" />
                <img src="/ovo.png" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="OVO" />
                <img src="/bni.png" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="BNI" />
                <img src="/dana.png" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="DANA" />
                <img src="https://cdn.simpleicons.org/visa/1A1F71" className="h-9 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="Visa" />
                <img src="https://cdn.simpleicons.org/mastercard/EB001B" className="h-8 w-8 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="Mastercard" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Jasa Pengiriman</h4>
              <div className="flex flex-wrap gap-3">
                <img src="/jne.png" className="h-10 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="JNE" />
                <img src="/sicepat.png" className="h-10 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="SiCepat" />
                <img src="/jnt.png" className="h-10 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="J&T" />
                <img src="/gosend.png" className="h-10 w-12 object-contain opacity-70 hover:opacity-100 transition-opacity" alt="Gosend" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Sistem Keamanan</h4>
              <ul className="text-zinc-500 text-[10px] space-y-1">
                <li className="flex items-center gap-2">✔ PCI DSS Certified</li>
                <li className="flex items-center gap-2">✔ SSL Encrypted</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Lokasi Kami</h4>
              <p className="text-zinc-500 text-[10px]">Indonesia • Singapore • Malaysia</p>
            </div>
          </div>

          <div className="border-t border-white/10 mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <h2 className="text-white font-black text-xl tracking-tighter mb-4 font-(family-name:--font-space-grotesk)">SNEAKER<span className="text-indigo-500">HEAD</span></h2>
              <p className="text-zinc-500 text-xs mb-6 leading-relaxed">Sebagai Pusat Kultur Sneakers di Asia, kami menciptakan kemungkinan gaya tanpa batas.</p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Layanan</h4>
              <ul className="text-zinc-400 text-xs space-y-3">
                <li><Link href="#">Bantuan (FAQ)</Link></li>
                <li><Link href="#">Lacak Pesanan</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Tentang Kami</h4>
              <ul className="text-zinc-400 text-xs space-y-3">
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Karir</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Newsletter</h4>
              <input type="email" placeholder="Alamat email Kamu" className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white text-xs mb-4" />
              
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-3">Download App</h4>
              <div className="flex gap-2">
                <img src="https://cdn.simpleicons.org/appstore/0D96F6" className="h-10 hover:opacity-70 cursor-pointer" alt="App Store" />
                <img src="https://cdn.simpleicons.org/googlepay/4285F4" className="h-10 hover:opacity-70 cursor-pointer" alt="Google Play" />
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-col items-center md:items-start gap-3">
               <span className="text-white font-bold uppercase tracking-widest text-[10px]">Temukan Kami</span>
               <div className="flex gap-4">
                  <img src="https://cdn.simpleicons.org/instagram/FFFFFF" className="w-5 h-5 hover:opacity-70 cursor-pointer" alt="IG" />
                  <img src="https://cdn.simpleicons.org/facebook/FFFFFF" className="w-5 h-5 hover:opacity-70 cursor-pointer" alt="FB" />
                  <img src="https://cdn.simpleicons.org/x/FFFFFF" className="w-5 h-5 hover:opacity-70 cursor-pointer" alt="X" />
                  <img src="https://cdn.simpleicons.org/tiktok/FFFFFF" className="w-5 h-5 hover:opacity-70 cursor-pointer" alt="TT" />
               </div>
            </div>

            <div className="text-zinc-600 text-[10px] text-center md:text-right">
              <p>© 2026 SneakerHead Indonesia. Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </div>
      </footer>  
    </main>
  );
}