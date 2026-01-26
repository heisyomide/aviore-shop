"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { archiveCount, setIsArchiveOpen } = useArchive(); 

  // Updated links: Men and Women removed
  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collection", href: "/collection" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md py-5 px-6 md:px-12 flex justify-between items-center border-b border-gray-100">
        {/* Brand */}
        <Link href="/" className="text-xl font-black tracking-tighter uppercase italic text-black">
          AVIORÈ
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] uppercase font-black tracking-[0.2em] text-black/40 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button onClick={() => setIsArchiveOpen(true)} className="relative p-1">
            <ShoppingBag size={20} strokeWidth={2.5} className="text-black" />
            {archiveCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD747] text-black text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
                {archiveCount}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-black p-1" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[200] bg-white p-8 flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-black tracking-tighter uppercase italic text-black">AVIORÈ</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                <X size={24} strokeWidth={2.5} className="text-black" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-8">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-4xl font-black italic uppercase tracking-tighter text-black">
                      {item.name.replace(" ", "_")}
                    </span>
                    <ArrowRight className="text-[#FFD747] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="mt-auto pt-10 border-t border-gray-100 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 italic">Archive_System_V4.0</p>
              <div className="flex gap-6">
                <a href="#" className="text-[10px] font-black uppercase text-black">Instagram</a>
                <a href="#" className="text-[10px] font-black uppercase text-black">WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-[70px] w-full bg-white" />
    </>
  );
}