"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, History, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data representing sold-out, historical pieces
const ARCHIVED_DATA = [
  { id: "LOT-001", name: "1994 'Big E' Selvedge", brand: "Levi's", year: "1994", category: "Denim", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
  { id: "LOT-012", name: "Parachute Cargo Pant", brand: "Helmut Lang", year: "2003", category: "Trousers", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1" },
  { id: "LOT-045", name: "Sunsurf Aloha Shirt", brand: "Toyo Ent.", year: "1980", category: "Tops", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: "LOT-089", name: "Double Knee Duck", brand: "Carhartt", year: "1992", category: "Denim", img: "https://images.unsplash.com/photo-1542272604-787c3835535d" },
];

export default function ArchivesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black font-mono">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 md:px-12 max-w-400 mx-auto">
        {/* Archive Header */}
        <section className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase italic leading-none mb-6">
              Vault_Records
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 leading-relaxed">
              Declassified Inventory // 2024 - 2026. This section documents the historical movement of 1-of-1 artifacts. These pieces are <span className="text-white/80">no longer available</span> for acquisition.
            </p>
          </div>

          {/* Search/Filter Bar */}
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH_BY_LOT_OR_BRAND..."
              className="w-full bg-transparent border border-white/10 p-4 pl-10 text-[10px] outline-none focus:border-white/40 transition-all uppercase tracking-widest"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* The Archive Table/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {ARCHIVED_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className="group border border-white/5 bg-white/2 p-4 flex flex-col"
              >
                {/* Visual Record */}
                <div className="aspect-square overflow-hidden mb-6 relative grayscale brightness-50 contrast-125 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-700">
                  <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/80 px-4 py-2 border border-white/20 text-[8px] tracking-[0.4em] uppercase">
                      Declassified
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] text-white/20 block mb-1 tracking-widest uppercase">ID: {item.id}</span>
                      <h3 className="text-xs font-bold uppercase tracking-wider">{item.name}</h3>
                    </div>
                    <History size={14} className="text-white/10" />
                  </div>

                  <div className="grid grid-cols-2 border-t border-white/5 pt-4 gap-4 text-[9px] uppercase tracking-widest text-white/40 font-mono">
                    <div>
                      <p className="text-[7px] text-white/10 mb-1 italic">Brand_Entity</p>
                      <p className="text-white/60">{item.brand}</p>
                    </div>
                    <div>
                      <p className="text-[7px] text-white/10 mb-1 italic">Release_Year</p>
                      <p className="text-white/60">{item.year}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-32 border-t border-white/5 pt-8 flex justify-between items-center text-[8px] text-white/20 uppercase tracking-[0.5em] font-mono">
          <div className="flex gap-12">
            <span>Server_Status: Online</span>
            <span>Database: Archive_v02</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={10} /> Contact for Sourcing Requests
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}