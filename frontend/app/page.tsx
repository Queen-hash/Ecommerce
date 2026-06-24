'use client' // Tambahkan ini di paling atas!

import Link from "next/link";
import { motion } from "framer-motion"; // Import motion

// Kumpulan URL gambar dummy yang udah di-update
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

// Komponen buat Baris Sepatu
const MarqueeRow = ({ images, direction }: { images: string[], direction: 'left' | 'right' }) => {
  const duplicatedImages = [...images, ...images]; 

  return (
    <div className={`flex w-max gap-4 my-2 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
      {duplicatedImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Shoe Background"
          className="w-48 h-32 md:w-64 md:h-40 object-cover rounded-xl opacity-15"
        />
      ))}
    </div>
  );
};

// Komponen KHUSUS buat Baris Logo di sela-sela sepatu
const LogoMarqueeRow = ({ direction }: { direction: 'left' | 'right' }) => {
  // Digandakan 3x biar scrollingnya panjang dan nggak putus
  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos]; 

  return (
    <div className={`flex w-max gap-24 items-center my-4 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
      {duplicatedLogos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Brand Logo"
          className="h-8 md:h-12 object-contain opacity-20"
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden bg-black">
      
      {/* --- LAYER BACKGROUND ANIMASI --- */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center -rotate-6 scale-125 pointer-events-none">
        <MarqueeRow images={row1} direction="right" />
        <LogoMarqueeRow direction="left" /> 
        <MarqueeRow images={row2} direction="left" />
        <LogoMarqueeRow direction="right" />
        <MarqueeRow images={row3} direction="right" />
      </div>

      {/* --- LAYER KONTEN UTAMA DENGAN ANIMASI --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} // Awalnya transparan dan agak di bawah
        animate={{ opacity: 1, y: 0 }}  // Muncul ke posisi normal
        transition={{ duration: 0.8, ease: "easeOut" }} // Durasi animasi
        className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto mt-12"
      >
        
        <div className="mb-8 inline-flex items-center rounded-sm border border-indigo-500/40 bg-black/40 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-indigo-300 backdrop-blur-md shadow-lg">
          New Drops • Summer Collection 26
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-[0_8px_8px_rgba(0,0,0,0.9)] font-(family-name:--font-space-grotesk)">
          Step Up <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
            Your Game.
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-300 mb-10 max-w-xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] font-medium leading-relaxed">
          Elevate your style with our premium authentic sneakers make a statement that goes beyond trends.
        </p>

        <Link
          href="/katalog"
          className="bg-white text-black px-10 py-4 rounded-md font-bold text-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1 uppercase tracking-wider font-(family-name:--font-space-grotesk)"
        >
          Explore Collection
        </Link>
      </motion.div>
      
    </div>
  );
}