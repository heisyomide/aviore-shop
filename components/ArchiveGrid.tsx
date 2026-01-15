"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: number; // Changed to number for localestring
  brand: string;
  category: "Denim" | "Tops" | "Shorts"; 
  img: string;
  isSold?: boolean;
  tag?: string;
}

const PRODUCTS: Product[] = [
  { 
    id: "lot-201", 
    name: "Ultra Baggy Graphite Denim", 
    price: 45000, 
    brand: "Avioré Studio", 
    category: "Denim",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80", 
    tag: "1-of-1" 
  },
  { 
    id: "lot-202", 
    name: "Sun-Faded Boxy Sweatshirt", 
    price: 32000, 
    brand: "Thrift Gold", 
    category: "Tops",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80",
    isSold: true 
  },
  { 
    id: "lot-203", 
    name: "Distressed Jorts", 
    price: 28000, 
    brand: "Archive Series", 
    category: "Shorts",
    img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80" 
  },
  { 
    id: "lot-204", 
    name: "Carpenter Work Pants", 
    price: 38500, 
    brand: "Carhartt Vintage", 
    category: "Denim",
    img: "https://images.unsplash.com/photo-1624372333417-645e042c86b8?auto=format&fit=crop&q=80", 
    tag: "Lot_04" 
  },
];

export default function ArchiveGrid() {
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Header */}
        <div className="mb-32 flex flex-col md:flex-row justify-between items-baseline gap-6">
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white uppercase italic leading-none">
            The <br /> <span className="ml-12 md:ml-24">Catalogue</span>
          </h2>
          <div className="max-w-xs">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] leading-relaxed font-light">
              Nigeria Based. 1-of-1 Curated Thrift. Once it is acquired, it is gone from the archive forever.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-32">
          {PRODUCTS.map((item, idx) => (
            <div 
              key={item.id} 
              className={`${
                idx % 4 === 0 ? "md:col-span-7" : 
                idx % 4 === 1 ? "md:col-span-5 md:mt-24" :
                idx % 4 === 2 ? "md:col-span-4" : 
                "md:col-span-8 md:-mt-12"
              }`}
            >
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item }: { item: Product }) {
  return (
    <Link href={`/shop/${item.id}`} className={`group block ${item.isSold ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <div className="relative overflow-hidden bg-[#111] aspect-[4/5]">
        {/* Image with Sold Out Overlay */}
        <motion.img 
          src={item.img} 
          alt={item.name}
          className={`object-cover w-full h-full grayscale-[0.8] group-hover:grayscale-0 transition-all duration-[1.2s] ease-[0.16, 1, 0.3, 1] ${item.isSold ? 'opacity-30' : ''}`}
          whileHover={!item.isSold ? { scale: 1.05 } : {}}
        />
        
        {/* Archival Tag */}
        {item.tag && !item.isSold && (
          <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-bold">
            {item.tag}
          </div>
        )}

        {/* Sold Badge */}
        {item.isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.8em] border border-white/10 px-6 py-3 backdrop-blur-sm">
              Acquired
            </span>
          </div>
        )}
      </div>

      {/* Minimalist Labels */}
      <div className="mt-8 flex justify-between items-start border-l border-white/10 pl-4">
        <div className="space-y-1">
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
            {item.brand} // {item.category}
          </p>
          <h3 className={`text-lg font-light tracking-tight uppercase italic ${item.isSold ? 'text-white/20' : 'text-white'}`}>
            {item.name}
          </h3>
        </div>
        <div className="text-right">
          <span className={`font-serif italic text-sm ${item.isSold ? 'line-through text-white/10' : 'text-white/40'}`}>
            ₦{item.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}