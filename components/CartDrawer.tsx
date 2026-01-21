"use client";
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Trash2, ShieldCheck, AlertTriangle } from "lucide-react"; // Added AlertTriangle
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

  // Check if any item in the cart has been sold while it was sitting in the drawer
  const hasSoldItems = archive.some(item => item.isSold);

  const drawerVariants: Variants = {
    hidden: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    visible: { x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.2 + i * 0.1, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  return (
    <AnimatePresence>
      {isArchiveOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsArchiveOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-200"
          />

          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed right-0 top-0 h-full w-full md:w-120 bg-[#0a0a0a] z-210 p-8 md:p-12 flex flex-col border-l border-white/5 shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
              <div className="space-y-1">
                <h2 className="text-2xl font-light tracking-tighter uppercase italic text-white leading-none">
                  Vault Archive
                </h2>
                <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                  Personal Collection // {archive.length} unique pieces
                </p>
              </div>
              <button onClick={() => setIsArchiveOpen(false)} className="group p-2 -mr-2">
                <X size={20} className="text-white/40 group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-10">
              {archive.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center opacity-20">
                  <p className="text-[9px] uppercase tracking-[0.6em] italic">The Vault is empty</p>
                </div>
              ) : (
                archive.map((item, i) => (
                  <motion.div 
                    key={item._id || item.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex gap-8 items-start group relative ${item.isSold ? 'opacity-40' : ''}`}
                  >
                    <div className="w-20 h-28 bg-[#141414] shrink-0 overflow-hidden relative border border-white/5">
                      <img 
                        src={item.img} 
                        alt={item.name}
                        className={`w-full h-full object-cover transition-all duration-1000 ${item.isSold ? 'grayscale' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`} 
                      />
                      {item.isSold && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                           <span className="text-[6px] text-white uppercase tracking-[0.3em] font-bold">SOLD</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">
                        {item.brand} // {item.category}
                      </p>
                      <h3 className="text-[11px] uppercase tracking-[0.25em] text-white leading-tight mb-2 truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-xs font-serif italic text-white/60">
                          ₦{item.price.toLocaleString()}
                        </p>
                        {item.isSold && (
                          <span className="text-[7px] text-red-500 uppercase font-mono tracking-widest flex items-center gap-1">
                            <AlertTriangle size={8} /> Item No Longer Available
                          </span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromArchive(item._id || item.id)} 
                      className="text-white/10 hover:text-white transition-colors pt-1"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
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
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-auto pt-10 border-t border-white/5 space-y-8"
              >
                <div className="flex justify-between items-baseline">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-mono italic block">Total Valuation</span>
                    <div className="flex items-center gap-2 text-[7px] text-green-500/50 uppercase tracking-widest font-mono">
                      <ShieldCheck size={10} /> Authenticity Verified
                    </div>
                  </div>
                  <span className="text-2xl font-serif italic text-white">
                    ₦{archiveTotal.toLocaleString()}
                  </span>
                </div>
                
                {hasSoldItems ? (
                  <div className="space-y-4">
                    <button className="w-full bg-zinc-800 text-white/40 cursor-not-allowed py-6 text-[10px] uppercase tracking-[0.6em] font-bold">
                      Vault Sync Conflict
                    </button>
                    <p className="text-[8px] text-red-500/80 uppercase tracking-widest text-center font-mono">
                      Please remove unavailable items to proceed
                    </p>
                  </div>
                ) : (
                  <Link href="/checkout" onClick={() => setIsArchiveOpen(false)} className="block w-full">
                    <button className="w-full bg-white text-black py-6 text-[10px] uppercase tracking-[0.6em] font-bold hover:bg-zinc-200 transition-colors">
                      Acquire Selection
                    </button>
                  </Link>
                )}
                
                <p className="text-center text-[7px] text-white/20 uppercase tracking-[0.4em] font-mono">
                  SECURE ENCRYPTED LOGISTICS // LAGOS, NG
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}