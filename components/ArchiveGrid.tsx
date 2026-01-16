"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Baggy_Silhouettes",
    category: "Denim",
    description: "Extra wide leg archival denim with heavy stacking.",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80",
      "https://images.unsplash.com/photo-1624372333417-645e042c86b8?q=80",
      "https://images.unsplash.com/photo-1511191088267-9303d077431e?q=80"
    ]
  },
  {
    title: "Boxy_Sweatshirts",
    category: "Tops",
    description: "Heavyweight sun-faded cotton and oversized fits.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80"
    ]
  },
  {
    title: "Pencil_&_Slim",
    category: "Denim",
    description: "Tailored vintage cuts and stacked pencil fits.",
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80",
      "https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80",
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80"
    ]
  },
  {
    title: "Archival_Knickers",
    category: "Shorts",
    description: "Vintage three-quarter lengths and workwear shorts.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80",
      "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80",
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80"
    ]
  },
  {
    title: "Essential_Round_Necks",
    category: "Tops",
    description: "Distressed graphic tees and authenticated relics.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80",
      "https://images.unsplash.com/photo-1503342392332-72167de13766?q=80",
      "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80"
    ]
  }
];

export default function ArchiveGrid() {
  return (
    <section className="bg-[#050505] py-20 px-4 md:px-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Mobile-First Header */}
        <div className="mb-24 border-b border-white/5 pb-10">
          <h2 className="text-5xl md:text-9xl font-light tracking-tighter text-white uppercase italic leading-none">
            The <br /> <span className="ml-8 md:ml-24">Catalogue</span>
          </h2>
          <div className="flex justify-between items-center mt-6">
            <p className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em] font-mono">
              Nigeria Based 1-of-1 Curated fashion world
            </p>
            <span className="h-[1px] w-12 bg-white/20"></span>
          </div>
        </div>

        {/* Vertical Stacked Sections */}
        <div className="space-y-32 md:space-y-60">
          {SECTIONS.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-8">
              
              {/* Text Label - Always on top for Mobile */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                   <span className="text-[9px] text-white/20 font-mono">0{idx + 1}</span>
                   <h3 className="text-3xl md:text-6xl font-light italic text-white uppercase tracking-tighter">
                    {section.title}
                  </h3>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                  {section.description}
                </p>
              </div>

              {/* Image Cluster - Natural Colors, No Hover required */}
              <Link 
                href={`/shop?category=${section.category}`} 
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {section.images.map((img: string, i: number) => (
                  <div 
                    key={i}
                    className={`overflow-hidden bg-[#111] aspect-[3/4] border border-white/5 ${
                      i === 2 ? "hidden md:block" : "" // Hide 3rd image on small mobile to keep thumbnails large
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={section.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </Link>

              {/* Action Button */}
              <div>
                <Link 
                  href={`/shop?category=${section.category}`}
                  className="inline-block text-[9px] uppercase tracking-[0.4em] text-white border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all"
                >
                  Explore_{section.category}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Entry */}
        <div className="mt-40 text-center border-t border-white/5 pt-20">
          <Link href="/shop" className="text-3xl md:text-6xl uppercase italic tracking-tighter text-white/80 hover:text-white transition-all">
            Full_Archive_Access —&gt;
          </Link>
        </div>
      </div>
    </section>
  );
}