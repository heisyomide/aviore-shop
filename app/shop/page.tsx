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
      
    <main className="pt-32 md:pt-40 pb-20 px-3 md:px-12"> {/* Reduced padding for mobile edge-to-edge look */}
  <header className="max-w-7xl mx-auto mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
    <div>
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-2 md:mb-4 uppercase italic leading-none">Archive</h1>
      <p className="text-[8px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase font-mono">
        {loading ? "Syncing_Vault..." : `Vault_Count: ${filteredItems.length} // Live_Sync: Active`}
      </p>
    </div>

    <nav className="flex gap-5 md:gap-8 border-b border-white/5 pb-2 w-full md:w-auto overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          className={`text-[8px] md:text-[10px] uppercase tracking-[0.3em] transition-all duration-500 relative pb-2 whitespace-nowrap ${
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
      <p className="text-[9px] uppercase tracking-[0.8em] animate-pulse">Initializing_Manifest...</p>
    </div>
  ) : (
    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-12 gap-y-10 md:gap-y-24">
      {/* grid-cols-2 makes it two-column on mobile. lg:grid-cols-3 keeps it three-column on desktop. */}
      <AnimatePresence mode="popLayout">
        {filteredItems.map((item: any) => (
          <motion.div
            key={item._id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <Link 
              href={item.isSold ? "#" : `/shop/${item._id}`} 
              className={`group block ${item.isSold ? 'pointer-events-none' : 'cursor-pointer'}`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#0d0d0d] mb-4 relative border border-white/5">
                <img 
                  src={item.images?.[0] || item.img} 
                  alt={item.name} 
                  className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out
                    ${item.isSold ? 'opacity-20 scale-100 grayscale' : 'opacity-100 group-hover:scale-105'}`} 
                />
                
                {item.isSold && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                    <span className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] border border-white/20 px-2 md:px-4 py-1.5 bg-black text-white font-bold">
                      Sold
                    </span>
                  </div>
                )}
              </div>

              <div className={`space-y-1.5 transition-opacity duration-500 ${item.isSold ? 'opacity-20' : 'group-hover:opacity-80'}`}>
                <div>
                  <p className="text-[7px] font-mono text-white/30 uppercase tracking-widest">
                    {item.brand}
                  </p>
                  <h3 className="text-[9px] md:text-xs font-light tracking-[0.1em] uppercase leading-tight truncate">
                    {item.name}
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] md:text-sm font-serif italic text-white/60">
                     ₦{item.price.toLocaleString()}
                   </span>
                   <span className="text-[7px] font-mono text-white/10 uppercase">
                     {item.lotNumber || 'LT-00'}
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