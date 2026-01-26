"use client";
import React from "react";
import Link from "next/link";

const PRODUCTS = [
  {
    title: "Baggy_Silhouettes",
    description: "Extra wide leg archival denim with heavy stacking and vintage wash.",
    price: "$120",
    image: "/baggy/baggy 1.jpg",
    isNew: true
  },
  {
    title: "Boxy_Sweatshirts",
    description: "Heavyweight sun-faded cotton and oversized fits for daily utility.",
    price: "$95",
    image: "sweatshirt/swaet1.jpg",
    isNew: true
  },
  {
    title: "Pencil_&_Slim",
    description: "Tailored vintage cuts and stacked pencil fits with distressed hems.",
    price: "$110",
    image: "baggy/slim1.jpg",
    isNew: true
  }
];

export default function ArchiveGrid() {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: Scaled down to look "fit" and editorial */}
        <div className="mb-14 space-y-3">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-black">
            New Drops
          </h3>
          <p className="text-[10px] text-black/40 font-bold uppercase tracking-[0.2em] max-w-md leading-relaxed">
            Stand out with our latest collection—bold designs, premium fabrics, and street-ready fits.
          </p>
        </div>

        {/* GRID: 3 columns, perfectly aligned spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, idx) => (
            <Link key={idx} href="/shop" className="group block">
              
              {/* IMAGE CARD: Light Ash Grey (#F3F3F3) with heavy rounding */}
              <div className="relative aspect-[4/5] bg-[#F3F3F3] rounded-[30px] md:rounded-[45px] overflow-hidden flex items-center justify-center p-10 transition-all duration-500 group-hover:bg-[#EAEAEA]">
                
                {/* NEW BADGE: Small and professional */}
                {product.isNew && (
                  <span className="absolute top-6 left-8 bg-black text-white text-[7px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest z-10">
                    New
                  </span>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>

              {/* DETAILS: Perfectly fit under the card */}
              <div className="mt-6 space-y-2 px-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-[16px] font-black uppercase tracking-tighter italic text-black leading-none">
                    {product.title}
                  </h4>
                  <span className="text-[13px] font-black italic text-black leading-none">
                    {product.price}
                  </span>
                </div>
                
                <p className="text-[10px] text-black/40 font-bold uppercase leading-relaxed tracking-tight max-w-[90%]">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER ACTION: Minimal text link */}
        <div className="mt-20 border-t border-gray-100 pt-10 text-center">
            <Link href="/shop" className="text-[11px] font-black uppercase tracking-[0.5em] text-black/30 hover:text-black transition-colors">
                View_All_Archives —&gt;
            </Link>
        </div>
      </div>
    </section>
  );
}