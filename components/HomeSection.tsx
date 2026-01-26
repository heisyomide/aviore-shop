"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Fingerprint, Ruler, ChevronRight } from "lucide-react";
import Link from "next/link";

// --- SECTION 1: ARCHIVAL CATEGORIES ---
export function ArchivalCategories() {
  const categories = [
    { 
      name: "Knitted Collar", 
      items: "12 Pieces", 
      img: "/Knitted-Collar.jpg" // Raw denim focus
    },
    { 
      name: "Round Necks", 
      items: "08 Pieces", 
      img: "sweatshirt/top2.jpg" // Gorpcore/Technical focus
    },
    { 
      name: "Caps", 
      items: "15 Pieces", 
      img: "/caps.jpg" // Vintage tee focus
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 italic">01 // Archive_Classification</h2>
        <Link href="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-[#FFD747] transition-colors">
          View_All_Sectors <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.name} href={`/shop?category=${cat.name}`} 
            className="group relative h-[450px] md:h-[550px] overflow-hidden rounded-[40px] bg-[#F3F3F3] border border-black/5"
          >
            {/* Image: Hover effect disabled on mobile via 'md:group-hover' */}
            <img 
              src={cat.img} 
              className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-[1s] opacity-90" 
              alt={cat.name}
            />
            
            {/* Scrim for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-[24px] border border-black/5 w-full flex justify-between items-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest mb-1 text-[#FFD747]">{cat.items}</p>
                  <h3 className="text-sm font-black italic uppercase tracking-tighter leading-none">{cat.name.replace("_", " ")}</h3>
                </div>
                <ArrowUpRight size={18} strokeWidth={3} className="text-[#FFD747]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// --- SECTION 2: SPECIMEN OF THE WEEK ---
export function FeaturedSpecimen() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="relative group overflow-hidden rounded-[40px] md:rounded-[60px] bg-[#F3F3F3]">
        
        {/* Main Editorial Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[80vh]">
          <div className="relative h-[50vh] md:h-full overflow-hidden border-r border-black/5">
             <img 
               src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80" 
               className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-[2s]"
               alt="Editorial View 1"
             />
          </div>
          <div className="hidden md:block relative h-full overflow-hidden">
             <img 
               src="/ccc.jpg" 
               className="w-full h-full object-cover grayscale translate-y-12 md:group-hover:translate-y-0 transition-all duration-[2s]"
               alt="Editorial View 2"
             />
          </div>
        </div>

        {/* Floating Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-white via-white/20 to-transparent">
          <div className="max-w-4xl w-full">
            <div className="flex items-center gap-4 mb-6">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] px-4 py-2 bg-black text-white rounded-full">Specimen_084</span>
               <div className="h-px w-20 bg-black/10" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 italic">Seasonal_Artifact</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-6xl md:text-[10vw] font-black uppercase italic tracking-[calc(-0.06em)] leading-[0.75] text-black">
                The_Evisu <br /> Paradox.
              </h2>
              
              <div className="md:max-w-xs space-y-6">
                <p className="text-[11px] font-bold text-black/60 uppercase leading-relaxed tracking-tight">
                  Exploring the silhouette of mid-90s Osaka denim. A study in multi-pocket utility and hand-painted artistry.
                </p>
                <Link 
                  href="/shop/specimen-084" 
                  className="inline-flex items-center gap-6 group/btn"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-[#FFD747] pb-1">
                    Enter_Archive
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white group-hover/btn:bg-[#FFD747] group-hover/btn:text-black transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialBridge() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden rounded-[40px] md:rounded-[60px] group bg-[#F3F3F3]">
        
        {/* Background Narrative Image */}
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover grayscale opacity-80 md:group-hover:scale-105 transition-transform duration-[3s] ease-out"
          alt="Lagos Urban Editorial"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent flex flex-col justify-end p-8 md:p-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 items-end gap-12"
          >
            {/* Left Column: Title */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-black/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Visual_Essay_001</span>
              </div>
              <h2 className="text-6xl md:text-[8vw] font-black uppercase italic tracking-[calc(-0.06em)] leading-[0.75] text-black">
                The_Brutalist <br /> Summer.
              </h2>
            </div>

            {/* Right Column: Description & Action */}
            <div className="space-y-8 lg:pb-6">
              <p className="text-[12px] md:text-[14px] font-bold text-black/60 uppercase leading-relaxed tracking-tight max-w-md">
                A photographic study in Lagos. Exploring the tension between weathered architectural concrete and the crisp silhouettes of archival technical wear. 
              </p>
              
              <Link href="/editorial" className="group/btn relative inline-flex items-center gap-4">
                <div className="px-8 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] group-hover/btn:bg-[#FFD747] group-hover/btn:text-black transition-all">
                  Read_Full_Narrative
                </div>
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Tag */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
           <span className="text-[9px] font-black uppercase tracking-widest text-black/20 italic">Location: Lagos_NG</span>
           <span className="text-[9px] font-black uppercase tracking-widest text-black/20 italic">Coordinates: 6.4550° N</span>
        </div>
      </div>
    </section>
  );
}