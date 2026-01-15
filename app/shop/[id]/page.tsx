"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // To get the ID from URL
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, PackageCheck } from "lucide-react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";
import { getProductById } from "@/app/actions/shop";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToArchive } = useArchive();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (id) {
        const data = await getProductById(id as string);
        setProduct(data);
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToArchive({
        id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        category: product.category,
        img: product.images[0]
      });
      setIsAdding(false);
    }, 800);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-[10px] uppercase tracking-[0.8em] text-white/20 animate-pulse">Accessing_Archive_Data...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Lot_Not_Found</p>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1800px] mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <Link href="/shop" className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Index
          </Link>
          <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
            Status: {product.isSold ? "Acquired" : "Available"} // {product.lotNumber}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT: Live Image Stack */}
          <div className="lg:col-span-7 space-y-12">
            {product.images.map((img: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative aspect-[4/5] overflow-hidden bg-[#111]"
              >
                <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                {product.isSold && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.8em] font-light">Sold Out</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Live Content Section */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-16">
              
              <section>
                <motion.span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-6">
                  {product.brand}
                </motion.span>
                <motion.h1 className="text-6xl md:text-7xl font-light tracking-tighter uppercase italic leading-[0.9] mb-8">
                  {product.name}
                </motion.h1>
                <p className="text-3xl font-serif italic text-white/80">₦{product.price.toLocaleString()}</p>
              </section>

              <section className="space-y-8 border-t border-white/5 pt-12">
                <p className="text-sm text-white/50 leading-relaxed font-light max-w-md uppercase tracking-wide">
                  {product.description}
                </p>
                {/* Dynamically showing details if they exist in your schema */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-white/40 font-mono">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      Section: {product.category}
                    </div>
                    <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-white/40 font-mono">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      Reference: {product.lotNumber}
                    </div>
                </div>
              </section>

              <section className="space-y-6">
                {!product.isSold ? (
                  <motion.button
                    onClick={handleAdd}
                    disabled={isAdding}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-6 bg-white text-black text-[10px] uppercase tracking-[0.6em] font-bold overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {!isAdding ? (
                        <motion.span key="add" exit={{ y: -20, opacity: 0 }}>
                          Commit to Archive
                        </motion.span>
                      ) : (
                        <motion.span key="loading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                          Acquiring Piece...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ) : (
                  <button disabled className="w-full py-6 border border-white/10 text-white/20 text-[10px] uppercase tracking-[0.6em] font-bold cursor-not-allowed">
                    Sold to Archive
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-[7px] text-white/20 uppercase tracking-widest">
                    <ShieldCheck size={12} strokeWidth={1} /> 1-of-1 Specimen
                  </div>
                  <div className="flex items-center gap-2 text-[7px] text-white/20 uppercase tracking-widest">
                    <PackageCheck size={12} strokeWidth={1} /> Tracked Logistics
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}