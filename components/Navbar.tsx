"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { archiveCount, setIsArchiveOpen } = useArchive(); 

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collection", href: "/collection" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* FIXED NAVBAR: Stays at the top on scroll, very slim height */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-50">
        {/* Brand */}
        <Link href="/" className="text-xl font-black tracking-tighter uppercase italic text-black">
          AVIORÉ
        </Link>

        {/* Desktop Links: Compact and centered */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[10px] uppercase font-bold tracking-[0.2em] transition-colors ${
                item.name === "Collection" ? "text-black underline underline-offset-4" : "text-black/50 hover:text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart & Mobile */}
        <div className="flex items-center gap-6">
          <button onClick={() => setIsArchiveOpen(true)} className="relative p-1">
            <ShoppingBag size={18} strokeWidth={2.5} className="text-black" />
            {archiveCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black text-white text-[7px] font-black flex items-center justify-center rounded-full">
                {archiveCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-black" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>
      </nav>
      
      {/* Spacer to prevent Hero from going under the fixed navbar */}
      <div className="h-[70px] w-full bg-white" />
    </>
  );
}