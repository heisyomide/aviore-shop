"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Destructure setIsArchiveOpen to open the drawer on click
  const { archiveCount, setIsArchiveOpen } = useArchive(); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "/shop" },
    { name: "Editorial", href: "/editorial" },
    { name: "Archives", href: "/archives" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-6 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group flex flex-col">
            <span className="text-2xl font-bold tracking-tighter text-white uppercase italic leading-none">
              Avioré
            </span>
            <span className="text-[7px] tracking-[0.3em] text-white/30 uppercase font-mono mt-1">
              Quality Denim Archive
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* UPDATED: Changed from Link to Button to trigger Cart Drawer */}
            <button 
              onClick={() => setIsArchiveOpen(true)}
              className="relative p-2 group outline-none"
              aria-label="Open Archive Vault"
            >
              <ShoppingBag size={20} className="text-white group-hover:opacity-50 transition-opacity" />
              <AnimatePresence>
                {archiveCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-white text-black text-[8px] font-bold flex items-center justify-center rounded-full"
                  >
                    {archiveCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} className="text-white" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu logic remains the same */}
      <AnimatePresence>
        {/* ... mobile menu code ... */}
      </AnimatePresence>
    </>
  );
}