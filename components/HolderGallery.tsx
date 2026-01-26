"use client";
import React from "react";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  "baggy/model2.jpg",
  "baggy/model4.jpg",
  "baggy/model1.jpg",
  "baggy/model3.jpg"
];

export function HolderGallery() {
  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER: Editorial & Compact */}
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FFD747] animate-pulse" />
            <p className="text-[10px] text-black/40 font-bold tracking-[0.3em] uppercase">
              In_The_Wild
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl text-black font-black uppercase italic tracking-tighter leading-none">
            Recognized_Holders
          </h2>
        </div>

        {/* STAGGERED GRID: Making them "stand" perfectly like an editorial spread */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative overflow-hidden rounded-[25px] md:rounded-[40px] aspect-[2/3] bg-[#F3F3F3] shadow-sm
                ${i % 2 !== 0 ? "md:mt-16" : ""} // This creates the staggered "stair" look
              `}
            >
              <img 
                src={img} 
                alt="Avioré Holder" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
              />
              
              {/* Subtle Overlay Tag */}
              <div className="absolute bottom-4 left-4">
                <span className="text-[8px] font-black text-white/70 uppercase tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                  Archive_0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}