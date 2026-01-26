"use client";
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Trash2, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { useArchive } from "@/context/ArchiveContext";
import Link from "next/link";

export default function CartDrawer() {
  const { 
    isArchiveOpen, 
    setIsArchiveOpen, 
    archive, 
    removeFromArchive, 
    archiveTotal 
  } = useArchive();

  const hasSoldItems = archive.some(item => item.isSold);

  const drawerVariants: Variants = {
    hidden: { x: "100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
    visible: { x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.5 }
    })
  };

  return (
    <AnimatePresence>
      {isArchiveOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsArchiveOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200]"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-[210] p-8 md:p-12 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.05)]"
          >
            {/* Design Layer: Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Header */}
            <div className="flex justify-between items-center mb-16 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FFD747]" />
                  <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em]">Live_Inventory</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic text-black leading-none">
                  Vault_Archive
                </h2>
              </div>
              <button onClick={() => setIsArchiveOpen(false)} className="bg-[#141313] p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-6 relative z-10">
              {archive.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center opacity-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] italic">The Vault is empty</p>
                </div>
              ) : (
                archive.map((item, i) => (
                  <motion.div 
                    key={item._id || item.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex gap-6 items-center bg-[#F9F9F9] p-4 rounded-[30px] border border-black/5 relative group ${item.isSold ? 'opacity-50' : ''}`}
                  >
                    <div className="w-20 h-24 bg-[#F3F3F3] rounded-2xl shrink-0 overflow-hidden relative">
                      <img 
                        src={item.img} 
                        alt={item.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${item.isSold ? 'grayscale' : 'grayscale group-hover:grayscale-0'}`} 
                      />
                      {item.isSold && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <span className="text-[8px] text-white uppercase font-black tracking-widest">SOLD</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">
                        {item.brand}
                      </p>
                      <h3 className="text-[11px] font-black uppercase tracking-tighter text-black leading-tight mb-2 truncate italic">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-[13px] font-black italic text-black">
                          ₦{item.price.toLocaleString()}
                        </p>
                        {item.isSold && (
                          <span className="text-[7px] text-red-500 uppercase font-black tracking-widest flex items-center gap-1">
                            <AlertTriangle size={8} /> Unavailable
                          </span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromArchive(item._id || item.id)} 
                      className="bg-white p-2 rounded-full shadow-sm text-black/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} strokeWidth={2.5} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Total */}
            {archive.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto pt-10 border-t border-black/5 space-y-8 relative z-10"
              >
                <div className="flex justify-between items-baseline px-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 block italic">Total Valuation</span>
                    <div className="flex items-center gap-2 text-[8px] text-black/40 uppercase tracking-widest font-black">
                      <ShieldCheck size={12} className="text-[#FFD747]" /> Authenticity_Verified
                    </div>
                  </div>
                  <span className="text-3xl font-black italic text-black tracking-tighter">
                    ₦{archiveTotal.toLocaleString()}
                  </span>
                </div>
                
                {hasSoldItems ? (
                  <div className="space-y-4">
                    <button className="w-full bg-red-50 text-red-500/50 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] cursor-not-allowed">
                      Vault Sync Conflict
                    </button>
                    <p className="text-[8px] text-red-500 font-black uppercase tracking-widest text-center">
                      Remove unavailable specimens to proceed
                    </p>
                  </div>
                ) : (
                  <Link href="/checkout" onClick={() => setIsArchiveOpen(false)} className="block w-full">
                    <button className="group w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                      Acquire Selection
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                )}
                
                <p className="text-center text-[8px] text-black/20 font-black uppercase tracking-[0.3em]">
                  Lagos Atelier // Global Logistics Enabled
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}