"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Recycle, Fingerprint } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-40 pb-20">
        {/* HERO SECTION: The Manifesto */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.85] uppercase italic mb-12">
              The_Archive <br /> Protocol.
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed tracking-tight">
              AVIORÉ is a curated digital vault based in Lagos, Nigeria. We do not sell "clothes"; we manage an archive of 1-of-1 artifacts sourced from across the globe, specifically selected for their construction, history, and silhouette.
            </p>
          </motion.div>
        </section>

        {/* IMAGE BREAK: Brutalist Aesthetic */}
        <section className="w-full h-[60vh] bg-[#111] overflow-hidden mb-40 grayscale group">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-[3000ms]"
            alt="Textile detail"
          />
        </section>

        {/* CORE VALUES: The Pillars */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-40">
          <ValueBlock 
            icon={<Fingerprint size={24} strokeWidth={1} />}
            title="Singularity"
            desc="Every item in the archive is a 1-of-1 specimen. Once acquired, it is removed from the live inventory forever. We believe in the power of the unique silhouette."
          />
          <ValueBlock 
            icon={<Shield size={24} strokeWidth={1} />}
            title="Verification"
            desc="Each piece undergoes a rigorous authentication and restoration process. We ensure that vintage quality meets modern archival standards."
          />
          <ValueBlock 
            icon={<Recycle size={24} strokeWidth={1} />}
            title="Circularity"
            desc="By repurposing high-quality garments, we reject the cycle of fast fashion. AVIORÉ exists to extend the lifespan of exceptional design."
          />
        </section>

        {/* THE SYSTEM: Technical Details */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 pt-20 flex flex-col md:flex-row gap-12 justify-between">
          <div className="md:w-1/3">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-8 font-mono italic">
              System_Operations
            </h2>
          </div>
          <div className="md:w-2/3 space-y-12">
             <p className="text-3xl md:text-5xl font-serif italic text-white/90 leading-tight">
               "We operate at the intersection of vintage discovery and digital precision."
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] uppercase tracking-[0.2em] text-white/40 font-mono">
               <div className="space-y-4">
                 <p className="text-white">01 // SOURCE</p>
                 <p>Global sourcing network identifying rare denim and technical outerwear.</p>
               </div>
               <div className="space-y-4">
                 <p className="text-white">02 // CURATE</p>
                 <p>Selection based on cultural relevance, fabric weight, and historical context.</p>
               </div>
               <div className="space-y-4">
                 <p className="text-white">03 // DELIVER</p>
                 <p>Secure logistics across Nigeria and international hubs via specialized couriers.</p>
               </div>
               <div className="space-y-4">
                 <p className="text-white">04 // EVOLVE</p>
                 <p>Constantly redefining the thrift experience for the modern collector.</p>
               </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ValueBlock({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-6">
      <div className="text-white/30">{icon}</div>
      <h3 className="text-xl font-light uppercase tracking-widest">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  );
}