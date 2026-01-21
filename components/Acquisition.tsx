"use client";
import React from "react";
import { motion } from "framer-motion";

const TICKER_DATA = [
  "ITEM_LOT_702_ACQUIRED_BY_HOLDER_IN_LAGOS",
  "NEW_ARCHIVE_DROPPING_SATURDAY_12:00_WAT",
  "AUTHENTICITY_VERIFIED_BY_AVIORÈ_COMMAND",
  "WORLDWIDE_DISPATCH_AVAILABLE",
  "1_OF_1_CURATED_RELICS_ONLY",
  "DATABASE_REFRESH_COMPLETE",
  "ITEM_LOT_405_COMMITTED_TO_ARCHIVE",
];

export default function AcquisitionTicker() {
  return (
    <div className="bg-white text-black py-2 border-y border-white/10 overflow-hidden whitespace-nowrap flex">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, 
          ease: "linear" 
        }}
        className="flex gap-12 items-center"
      >
        {/* Double the data to create a seamless loop */}
        {[...TICKER_DATA, ...TICKER_DATA].map((text, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">
              {text}
            </span>
            <span className="w-2 h-2 bg-black rounded-full"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}