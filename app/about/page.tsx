"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Recycle, Fingerprint, ArrowDownRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 relative overflow-hidden">
        {/* DESIGN LAYER: Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '80px 80px' }} 
        />

        {/* HERO SECTION: The Manifesto */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-40 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="w-3 h-3 rounded-full bg-[#FFD747] animate-pulse" />
               <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">System_Manifesto_V2.0</span>
            </div>
            <h1 className="text-[15vw] md:text-[9vw] font-black tracking-[calc(-0.05em)] leading-[0.8] uppercase italic mb-12 text-black">
              The_Archive <br /> Protocol.
            </h1>
            <p className="text-xl md:text-3xl font-black text-black/40 leading-[1.1] tracking-tighter uppercase italic max-w-3xl">
              AVIORÈ is a curated digital vault based in Lagos, Nigeria. We do not sell "clothes"; we manage an archive of artifacts selected for construction, history, and silhouette.
            </p>
          </motion.div>
        </section>

        {/* IMAGE BREAK: Rounded Atelier Style */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-40">
          <div className="w-full h-[50vh] md:h-[70vh] bg-[#F3F3F3] rounded-[40px] md:rounded-[60px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 relative group">
            <img 
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s]"
              alt="Archival detail"
            />
            <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-black">Artifact_Study_001 // Fabric_Composition</p>
            </div>
          </div>
        </section>

        {/* CORE VALUES: The Pillars */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <ValueBlock 
            icon={<Fingerprint size={28} strokeWidth={2.5} />}
            title="Singularity"
            desc="Every item is a 1-of-1 specimen. Once acquired, it is removed from the live inventory forever. We believe in the power of the unique silhouette."
          />
          <ValueBlock 
            icon={<Shield size={28} strokeWidth={2.5} />}
            title="Verification"
            desc="Each piece undergoes a rigorous authentication process. We ensure that vintage quality meets modern archival standards."
          />
          <ValueBlock 
            icon={<Recycle size={28} strokeWidth={2.5} />}
            title="Circularity"
            desc="By repurposing high-quality garments, we reject the cycle of fast fashion. AVIORÈ exists to extend the lifespan of design."
          />
        </section>

        {/* THE SYSTEM: Technical Details */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto border-t border-black/5 pt-20 flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-black/20 italic">
              System_Operations
            </h2>
            <ArrowDownRight size={40} strokeWidth={1} className="text-[#FFD747]" />
          </div>
          <div className="lg:w-2/3 space-y-16">
             <p className="text-4xl md:text-6xl font-black italic text-black leading-[0.9] tracking-tighter uppercase">
               "We operate at the intersection of vintage discovery and digital precision."
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
               <SystemStep num="01" title="SOURCE" desc="Global sourcing network identifying rare denim and technical outerwear." />
               <SystemStep num="02" title="CURATE" desc="Selection based on cultural relevance, fabric weight, and historical context." />
               <SystemStep num="03" title="DELIVER" desc="Secure logistics across Nigeria and international hubs via specialized couriers." />
               <SystemStep num="04" title="EVOLVE" desc="Constantly redefining the thrift experience for the modern collector." />
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
    <div className="bg-[#F9F9F9] p-10 rounded-[40px] border border-black/5 hover:border-[#FFD747] transition-colors group">
      <div className="text-black mb-8 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-[13px] font-black uppercase tracking-[0.2em] mb-4 italic text-black">{title}</h3>
      <p className="text-[12px] font-bold text-black/40 leading-relaxed uppercase tracking-tight">
        {desc}
      </p>
    </div>
  );
}

function SystemStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-[#FFD747]">{num}</span>
        <p className="text-[11px] font-black text-black uppercase tracking-[0.3em]">{title}</p>
      </div>
      <p className="text-[12px] font-bold text-black/40 uppercase leading-relaxed tracking-tight">
        {desc}
      </p>
    </div>
  );
}