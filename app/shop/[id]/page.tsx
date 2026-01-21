"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, PackageCheck, Hash } from "lucide-react";
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
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-px bg-white/20 mb-4 animate-pulse" />
      <p className="text-[9px] uppercase tracking-[0.6em] text-white/40">Accessing_Archive_Data</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 italic">Specimen_Not_Located_In_Database</p>
    </div>
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <main className="pt-24 pb-20 px-4 md:px-12 max-w-350 mx-auto">
        
        {/* TOP NAVIGATION / STATUS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <Link href="/shop" className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
            <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Return_to_Index
          </Link>
          <div className="flex items-center gap-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] border-l border-white/10 pl-4 md:border-none md:pl-0">
             <span className={product.isSold ? "text-red-500/50" : "text-green-500/50"}>
               {product.isSold ? "ACQUIRED" : "AVAILABLE"}
             </span>
             <span className="hidden md:inline">//</span>
             <span className="flex items-center gap-1"><Hash size={8} /> {product.lotNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT: VISUAL STACK */}
          <div className="lg:col-span-7 space-y-4 md:space-y-8">
            {product.images.map((img: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-3/4 md:aspect-4/5 overflow-hidden bg-[#0a0a0a] border border-white/5"
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${idx}`} 
                  className="w-full h-full object-cover" 
                />
                {product.isSold && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.6em] font-bold">Acquired</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: SPECIFICATIONS & CONTROL */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-12">
              
              {/* PRIMARY INTEL */}
              <section className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">
                    {product.brand} // {product.category}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-light tracking-tighter uppercase italic leading-tight">
                    {product.name}
                  </h1>
                </div>
                <p className="text-2xl md:text-3xl font-serif italic text-white/90">₦{product.price.toLocaleString()}</p>
              </section>

              {/* DESCRIPTION & METRICS */}
              <section className="space-y-6 border-t border-white/5 pt-8">
                <p className="text-[11px] md:text-xs text-white/50 leading-relaxed uppercase tracking-widest font-light">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-6 pt-4">
                    <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/30 font-mono">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                      Condition: Authenticated
                    </div>
                    <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/30 font-mono">
                      <div className="w-1 h-1 bg-white/20 rounded-full" />
                      Origin: {product.category}
                    </div>
                </div>
              </section>

              {/* TRANSACTION COMMAND */}
              <section className="space-y-6">
                {!product.isSold ? (
                  <motion.button
                    onClick={handleAdd}
                    disabled={isAdding}
                    whileTap={{ scale: 0.97 }}
                    className="relative w-full py-5 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-black transition-all hover:bg-zinc-200"
                  >
                    <AnimatePresence mode="wait">
                      {!isAdding ? (
                        <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Commit_to_Archive
                        </motion.span>
                      ) : (
                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                          Data_Transmitting...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ) : (
                  <button disabled className="w-full py-5 border border-white/10 text-white/10 text-[10px] uppercase tracking-[0.5em] font-bold cursor-not-allowed italic">
                    Out_of_Stock
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[7px] text-white/20 uppercase tracking-[0.2em]">
                    <ShieldCheck size={10} strokeWidth={1.5} className="text-white/40" /> Verified Specimen
                  </div>
                  <div className="flex items-center gap-2 text-[7px] text-white/20 uppercase tracking-[0.2em]">
                    <PackageCheck size={10} strokeWidth={1.5} className="text-white/40" /> Secured Logistics
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