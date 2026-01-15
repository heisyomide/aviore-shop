"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6 md:px-12">
        {/* Editorial Header */}
        <header className="max-w-7xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-[15vw] md:text-[10vw] font-bold tracking-tighter uppercase italic leading-[0.8] mb-8">
              Edits.
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 gap-6">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono">
                Visual_Essays // Curated_Narratives
              </p>
              <p className="max-w-xs text-[11px] uppercase tracking-widest leading-relaxed text-white/60">
                Exploring the intersection of vintage textiles and modern urban environments in Nigeria.
              </p>
            </div>
          </motion.div>
        </header>

        {/* Stories Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
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
                  <div className="relative overflow-hidden bg-zinc-900 aspect-[16/9] md:aspect-auto md:h-[70vh] mb-8">
                    <img 
                      src={story.img} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms] ease-out opacity-60 group-hover:opacity-100"
                      alt={story.title}
                    />
                    <div className="absolute top-8 left-8">
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                        {story.date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                      <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2">
                        {story.subtitle}
                      </p>
                      <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter italic">
                        {story.title}
                      </h2>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.5em] border-b border-white/20 pb-1 group-hover:border-white transition-colors">
                      Read_Entry
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter/Subscription for Drop Alerts */}
        <section className="max-w-7xl mx-auto mt-60 py-40 border-y border-white/5 text-center">
          <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-12">Join_the_Transmission</h3>
          <p className="text-2xl md:text-4xl font-serif italic mb-12 max-w-2xl mx-auto">
            Get notified the moment a new archive is declassified.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="ENCRYPTED_EMAIL@HOST.COM" 
              className="w-full bg-transparent border-b border-white/20 py-4 text-[10px] tracking-widest outline-none focus:border-white transition-colors text-center md:text-left"
            />
            <button className="w-full md:w-auto px-12 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}