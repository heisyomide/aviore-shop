"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
        className={`fixed top-0 w-full z-100 transition-all duration-500 px-6 md:px-12 py-6 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group flex flex-col">
            <span className="text-2xl font-bold tracking-tighter text-white uppercase italic leading-none">
              Aviorè
            </span>
            <span className="text-[7px] tracking-[0.3em] text-white/30 uppercase font-mono mt-1">
              REDIFINED STYLE
            </span>
          </Link>

          {/* Desktop Links - Visible only on Laptop/Tablet */}
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
            
            {/* Mobile Hamburger - Only visible on Phone */}
            <button 
                className="md:hidden p-2 text-white" 
                onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-110 bg-black p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter text-white uppercase italic">Aviorè</span>
                <span className="text-[7px] tracking-[0.3em] text-white/30 uppercase font-mono">Mobile_Portal</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white">
                <X size={32} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 mb-20">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl font-light italic text-white uppercase tracking-tighter hover:text-white/40"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/5 flex justify-between items-center">
              <p className="text-[9px] text-white/20 font-mono uppercase tracking-[0.4em]">System: 1.0.1_Operational</p>
              <div className="flex gap-4">
                 {/* Social links could go here */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}