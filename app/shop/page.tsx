"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getShopItems } from "@/app/actions/shop";

const CATEGORIES = ["All", "Denim", "Tops", "Shorts"];

export default function ShopPage() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadShop() {
      const data = await getShopItems();
      setItems(data || []);
      setLoading(false);
    }
    loadShop();
  }, []);

  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter((item: any) => item.category === activeFilter);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 md:px-12">
        <header className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h1 className="text-6xl font-light tracking-tighter mb-4 uppercase italic leading-none">Archive</h1>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-mono">
              {loading ? "Syncing_Vault..." : `Selection_Count: ${filteredItems.length} // Location: NG`}
            </p>
          </div>

          <nav className="flex gap-8 border-b border-white/5 pb-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-500 relative pb-2 whitespace-nowrap ${
                  activeFilter === cat ? "text-white" : "text-white/20 hover:text-white/60"
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-px bg-white" />
                )}
              </button>
            ))}
          </nav>
        </header>

        {loading ? (
          <div className="max-w-7xl mx-auto h-60 flex items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.8em] animate-pulse">Initializing_Manifest...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item: any) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  {/* If sold, we disable the link so no one can click it */}
                  <Link 
                    href={`/shop/${item._id}`} 
                    className={`group block ${item.isSold ? 'pointer-events-none' : 'cursor-pointer'}`}
                  >
                    
                    <div className="aspect-4/5 overflow-hidden bg-[#121212] mb-6 relative transition-all duration-1000">
                      <img 
                        src={item.images?.[0] || item.img} 
                        alt={item.name} 
                        className={`w-full h-full object-cover transition-transform duration-1000 
                          ${item.isSold ? 'opacity-20 grayscale scale-100' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`} 
                      />
                      
                      {/* SOLD OUT OVERLAY */}
                      {item.isSold && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="text-[9px] uppercase tracking-[0.6em] border border-white/40 px-4 py-2 bg-black text-white font-bold">
                            Archive_Sold
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={`flex justify-between items-start transition-opacity duration-500 ${item.isSold ? 'opacity-20' : 'group-hover:opacity-80'}`}>
                      <div className="max-w-[70%]">
                        <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-2">
                          {item.brand} // {item.lotNumber || 'N/A'}
                        </p>
                        <h3 className="text-xs font-light tracking-[0.2em] uppercase leading-relaxed">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                         <span className="text-sm font-serif italic text-white/80">
                           ₦{item.price.toLocaleString()}
                         </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}