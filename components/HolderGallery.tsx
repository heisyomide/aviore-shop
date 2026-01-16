"use client";
import React from "react";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80",
  "https://images.unsplash.com/photo-1529139513477-42f4d9b4ce84?q=80",
  "https://images.unsplash.com/photo-1539109132314-d4a8c62e4042?q=80",
  "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80"
];

export function HolderGallery() {
  return (
    <section className="bg-black py-40 px-4 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 space-y-4">
          <p className="text-[9px] text-green-500 font-mono tracking-[0.5em] uppercase">Status: In_The_Wild</p>
          <h2 className="text-4xl md:text-7xl text-white uppercase italic tracking-tighter">Recognized_Holders</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`bg-[#111] aspect-[2/3] overflow-hidden border border-white/5 ${i % 2 !== 0 ? "mt-12" : ""}`}
            >
              <img src={img} alt="Holder" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}