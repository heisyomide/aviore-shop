"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Correct import for navigation

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-[#0a0a0a] flex flex-col justify-between p-6 md:p-10 overflow-hidden">
      
      {/* 1. ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { 
              opacity: { duration: 2 },
              scale: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }
            }
          }}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          className="object-cover w-full h-full brightness-[0.4]"
          alt="Hero Focus"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"
        />
      </div>

      {/* 2. TOP BRANDING SPACE */}
      <div className="relative z-20 flex justify-between items-start">
        {/* Placeholder for potential logo or top nav elements */}
        <div />
        <div />
      </div>

      {/* 3. BOTTOM UTILITY */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-end gap-10">
        
        <div className="max-w-md">
          <div className="overflow-hidden mb-4">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-5xl md:text-7xl font-light tracking-tighter text-white uppercase"
            >
              New <span className="italic font-serif text-white/90">Arrivals.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            className="h-px w-full bg-gradient-to-r from-white/40 to-transparent mb-6 origin-left" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[11px] text-white/50 uppercase tracking-[0.2em] leading-relaxed"
          >
            A curated selection of archival garments sourced from private collections worldwide.
          </motion.p>
        </div>

        {/* EXPLORE REDIRECT */}
        <Link href="/shop">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 border bg-white/20 border-white/20 text-white text-[10px] uppercase tracking-[0.5em] group overflow-hidden"
          >
            <span className="relative z-10  group-hover:text-black transition-colors duration-500">
              Explore
            </span>
            <motion.div 
              className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" 
            />
          </motion.button>
        </Link>
      </div>

      {/* 4. MOUSE-TRACKING DECORATION */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-1/2 -rotate-90 origin-center text-[9px] font-mono tracking-[1em] text-white/10 uppercase hidden md:block"
      >
        Scroll_to_Initialize
      </motion.div>

    </section>
  );
}