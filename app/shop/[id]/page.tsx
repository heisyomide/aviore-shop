"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, PackageCheck, Hash, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useArchive } from "@/context/ArchiveContext";
import { getProductById } from "@/app/actions/shop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-px bg-black/10 mb-4 animate-pulse" />
      <p className="text-[10px] uppercase tracking-[0.5em] text-black/20 font-bold">Syncing_Product_Data</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold italic">Specimen_Not_Located</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-44 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        
        {/* BREADCRUMBS / STATUS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <Link href="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-black transition-all">
            <ArrowLeft size={12} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            Back_to_Archive
          </Link>
          <div className="flex items-center gap-4 text-[9px] font-black text-black/20 uppercase tracking-[0.2em]">
             <span className={product.isSold ? "text-red-500" : "text-black/40"}>
               {product.isSold ? "Status: Acquired" : "Status: In_Vault"}
             </span>
             <span className="opacity-20">//</span>
             <span className="flex items-center gap-1 font-mono tracking-tighter"><Hash size={10} /> {product.lotNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: VISUAL STACK - Staggered Ash Cards */}
          <div className="lg:col-span-7 space-y-6 md:space-y-10">
            {product.images.map((img: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] overflow-hidden bg-[#F3F3F3] rounded-[30px] md:rounded-[45px] border border-black/5"
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${idx}`} 
                  className={`w-full h-full object-cover ${product.isSold ? 'opacity-40 grayscale' : 'opacity-100'}`} 
                />
                {product.isSold && idx === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-xl">Sold Out</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: SPECIFICATIONS & CONTROL */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40 space-y-12">
              
              {/* PRIMARY INTEL */}
              <section className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFD747]" />
                    <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em]">
                      {product.brand} // {product.category}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] text-black">
                    {product.name}
                  </h1>
                </div>
                <p className="text-3xl font-black italic text-black">₦{product.price.toLocaleString()}</p>
              </section>

              {/* DESCRIPTION & METRICS */}
              <section className="space-y-8 border-t border-black/5 pt-10">
                <p className="text-[11px] md:text-xs text-black/50 leading-relaxed uppercase tracking-widest font-bold">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-2">
                    <div className="flex items-center gap-3 text-[9px] uppercase font-black tracking-widest text-black/30">
                      <div className="w-1.5 h-1.5 bg-black/10 rounded-full" />
                      Condition: DS
                    </div>
                    <div className="flex items-center gap-3 text-[9px] uppercase font-black tracking-widest text-black/30">
                      <div className="w-1.5 h-1.5 bg-black/10 rounded-full" />
                      Type: Archival
                    </div>
                </div>
              </section>

              {/* TRANSACTION COMMAND */}
              <section className="space-y-8">
                {!product.isSold ? (
                  <button
                    onClick={handleAdd}
                    disabled={isAdding}
                    className="relative w-full py-6 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.5em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center gap-4 group"
                  >
                    <AnimatePresence mode="wait">
                      {!isAdding ? (
                        <motion.div key="add" className="flex items-center gap-4">
                          Add to Archive 
                          <div className="bg-white/20 rounded-full p-2 group-hover:translate-x-1 transition-transform">
                            <ShoppingBag size={14} strokeWidth={3} />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.span key="loading" className="flex items-center gap-2 animate-pulse">
                          Transmitting_Data...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                ) : (
                  <button disabled className="w-full py-6 border-2 border-black/5 text-black/20 rounded-full text-[11px] font-black uppercase tracking-[0.5em] cursor-not-allowed italic">
                    Acquired_by_Holder
                  </button>
                )}

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/5">
                  <div className="flex items-center gap-3 text-[8px] font-black text-black/30 uppercase tracking-widest">
                    <ShieldCheck size={14} strokeWidth={3} className="text-black" /> Secure Authenticity
                  </div>
                  <div className="flex items-center gap-3 text-[8px] font-black text-black/30 uppercase tracking-widest">
                    <PackageCheck size={14} strokeWidth={3} className="text-black" /> Global Logistics
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}