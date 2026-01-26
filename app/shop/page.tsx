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
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-44 pb-20 px-4 md:px-12">
        <header className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic leading-none text-black">
              SHOP
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD747] animate-pulse" />
              <p className="text-[9px] md:text-[11px] tracking-[0.3em] text-black/40 uppercase font-bold">
                {loading ? "Syncing_Vault..." : `Vault_Count: ${filteredItems.length} // Live_Sync: Active`}
              </p>
            </div>
          </div>

          {/* Filter Navigation - Clean & Fit */}
          <nav className="flex gap-6 md:gap-10 border-b border-gray-100 pb-3 w-full md:w-auto overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-300 relative pb-2 whitespace-nowrap ${
                  activeFilter === cat ? "text-black" : "text-black/20 hover:text-black/60"
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-[-1.5px] left-0 w-full h-[2px] bg-black" />
                )}
              </button>
            ))}
          </nav>
        </header>

        {loading ? (
          <div className="max-w-7xl mx-auto h-64 flex items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.5em] font-bold animate-pulse text-black/20">Initializing_Manifest...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-10 gap-y-12 md:gap-y-20">
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
                    className={`group block ${item.isSold ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {/* PRODUCT CARD: The Ash-Grey Fit */}
                    <div className="aspect-[3/4] overflow-hidden bg-[#F3F3F3] rounded-[25px] md:rounded-[40px] mb-6 relative transition-transform duration-500 group-hover:scale-[0.98]">
                      <img 
                        src={item.images?.[0] || item.img} 
                        alt={item.name} 
                        className={`w-full h-full object-cover transition-all duration-[1.2s] ease-out
                          ${item.isSold ? 'opacity-30 grayscale' : 'opacity-100 group-hover:scale-110'}`} 
                      />
                      
                      {item.isSold && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-black px-4 py-2 bg-black text-white rounded-full">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>

                    {/* PRODUCT INFO: Scaled Down & Precise */}
                    <div className={`px-2 space-y-2 transition-opacity duration-500 ${item.isSold ? 'opacity-30' : 'group-hover:opacity-100'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[8px] font-black text-black/30 uppercase tracking-widest mb-1">
                            {item.brand || "Atelier"}
                          </p>
                          <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-tighter italic leading-none text-black">
                            {item.name}
                          </h3>
                        </div>
                        <span className="text-[11px] md:text-[14px] font-black italic text-black">
                          ₦{item.price.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-1">
                         <span className="text-[9px] font-bold text-black/40 uppercase tracking-tighter">
                           {item.category}
                         </span>
                         <span className="text-[8px] font-mono text-black/20 uppercase">
                           {item.lotNumber || 'LT-01'}
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