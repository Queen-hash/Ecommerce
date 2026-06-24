"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Store, ShoppingCart, User, LucideIcon } from "lucide-react"
import { cn } from "../lib/utils" // Import disesuaikan dengan posisi file

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

// Ini menu khusus E-commerce lu
const ecomNavItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Products", url: "/Products", icon: Store },
  { name: "Cart", url: "/Cart", icon: ShoppingCart },
  { name: "Profile", url: "/Profile", icon: User },
]

export function NavBar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState(ecomNavItems[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/70 border border-gray-200 backdrop-blur-lg py-2 px-2 rounded-full shadow-xl">
        {ecomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-gray-600 hover:text-indigo-600",
                isActive && "text-indigo-600",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-indigo-50 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Animasi Lampu Glow dari desain lu (warnanya gua sesuaikan jadi indigo/biru keunguan) */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-indigo-600/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-indigo-600/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-indigo-600/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}