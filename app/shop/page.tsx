"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getShopItems } from "@/app/actions/shop";

const CATEGORIES = ["All", "Denim", "Tops", "Shorts"];

export default function ShopPage() {
  const [items, setItems] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadShop() {
      setLoading(true);
      try {
        const data = await getShopItems();
        const sortedData = (data || []).sort((a: any, b: any) => {
          if (a.isSold === b.isSold) return 0;
          return a.isSold ? 1 : -1;
        });
        setItems(sortedData);
      } catch (error) {
        console.error("SYNC_ERROR:", error);
      } finally {
        setLoading(false);
      }
    }
    loadShop();
  }, []);

  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter((item: any) => item.category === activeFilter);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-20 px-4 md:px-12">
        <header className="max-w-7xl mx-auto mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-4 uppercase italic leading-none">Archive</h1>
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase font-mono">
              {loading ? "Syncing_Vault..." : `Vault_Count: ${filteredItems.length} // Live_Sync: Active`}
            </p>
          </div>

          <nav className="flex gap-6 md:gap-8 border-b border-white/5 pb-2 w-full md:w-auto overflow-x-auto no-scrollbar touch-pan-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] transition-all duration-500 relative pb-2 whitespace-nowrap ${
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
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item: any) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <Link 
                    href={item.isSold ? "#" : `/shop/${item._id}`} 
                    className={`group block ${item.isSold ? 'pointer-events-none' : 'cursor-pointer'}`}
                  >
                    
                    <div className="aspect-[4/5] overflow-hidden bg-[#121212] mb-6 relative border border-white/5">
                      <img 
                        src={item.images?.[0] || item.img} 
                        alt={item.name} 
                        className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out
                          ${item.isSold ? 'opacity-20 scale-100' : 'opacity-100 group-hover:scale-105'}`} 
                      />
                      
                      {item.isSold && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                          <span className="text-[9px] uppercase tracking-[0.6em] border border-white/40 px-4 py-2 bg-black text-white font-bold">
                            Archive_Sold
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={`flex justify-between items-start transition-opacity duration-500 ${item.isSold ? 'opacity-20' : 'group-hover:opacity-80'}`}>
                      <div className="max-w-[70%]">
                        <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1 md:mb-2">
                          {item.brand} // {item.lotNumber || 'N/A'}
                        </p>
                        <h3 className="text-[11px] md:text-xs font-light tracking-[0.2em] uppercase leading-relaxed">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                         <span className="text-xs md:text-sm font-serif italic text-white/80">
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