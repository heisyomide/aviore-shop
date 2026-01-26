"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const STORIES = [
  {
    id: "v01-concrete-jungle",
    title: "Brutalist Summer",
    subtitle: "Issue 01 // Archive Study",
    date: "JAN 2026",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80",
    size: "large"
  },
  {
    id: "v02-denim-history",
    title: "Denim as Armor",
    subtitle: "Issue 02 // Material Analysis",
    date: "FEB 2026",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80",
    size: "small"
  },
  {
    id: "v03-technical-wear",
    title: "Functional Forms",
    subtitle: "Issue 03 // Silhouette Study",
    date: "MAR 2026",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80",
    size: "small"
  }
];

export default function EditorialPage() {
  return (
    <div className="!bg-white min-h-screen text-black selection:bg-[#FFD747] selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-48 pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* DESIGN LAYER: Grid & Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Editorial Header */}
        <header className="max-w-7xl mx-auto mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-2.5 h-2.5 rounded-full bg-[#FFD747] animate-pulse" />
               <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em]">Editorial_Bureau</span>
            </div>
            <h1 className="text-[18vw] md:text-[12vw] font-black tracking-[calc(-0.06em)] uppercase italic leading-[0.75] mb-12">
              Edits.
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-end border-t border-black/5 pt-10 gap-8">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/20">
                Visual_Essays // Curated_Narratives
              </p>
              <p className="max-w-sm text-[12px] font-bold uppercase tracking-tight leading-relaxed text-black/50 italic">
                Exploring the intersection of vintage textiles and modern urban environments in Nigeria through a clinical lens.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Stories Grid */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-40">
            {STORIES.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className={`${story.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'} group cursor-pointer`}
              >
                <Link href={`/editorial/${story.id}`}>
                  <div className="relative overflow-hidden bg-[#F3F3F3] rounded-[40px] md:rounded-[60px] aspect-video md:aspect-auto md:h-[75vh] mb-10 border border-black/5">
                    <img 
                      src={story.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2.5s] ease-out opacity-80 group-hover:opacity-100"
                      alt={story.title}
                    />
                    <div className="absolute top-10 left-10">
                      <span className="text-[9px] font-black tracking-[0.2em] uppercase bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-black/5 shadow-sm">
                        {story.date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
                    <div>
                      <p className="text-[9px] font-black text-[#FFD747] uppercase tracking-[0.4em] mb-3">
                        {story.subtitle}
                      </p>
                      <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none text-black">
                        {story.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 group-hover:text-black transition-colors pb-2 border-b-2 border-transparent group-hover:border-[#FFD747]">
                      Read_Entry <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter/Transmission Section */}
        <section className="max-w-5xl mx-auto mt-60 mb-20 p-12 md:p-24 bg-[#F9F9F9] rounded-[50px] border border-black/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[#FFD747]" />
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-black/30 mb-10 mt-6">Join_the_Transmission</h3>
          <p className="text-3xl md:text-5xl font-black italic mb-14 tracking-tighter uppercase leading-tight">
            Get notified the moment a new <br className="hidden md:block"/> archive is declassified.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="ENCRYPTED_EMAIL@HOST.COM" 
              className="w-full bg-white rounded-full border border-black/5 py-5 px-8 text-[11px] font-black tracking-widest outline-none focus:ring-2 focus:ring-[#FFD747] transition-all uppercase"
            />
            <button className="w-full md:w-auto px-10 py-5 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}