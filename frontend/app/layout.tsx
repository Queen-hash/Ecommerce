import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google"; 
import "./globals.css";
import { NavBar } from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Setup font baru buat Headline
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Toko Sepatu Online | Headless E-Commerce",
  description: "Katalog lengkap sepatu premium dengan integrasi Sanity CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-gray-50 text-gray-900 font-sans">
        <NavBar />
        <main className="grow w-full">
          {children}
        </main>
      </body>
    </html>
  );
}