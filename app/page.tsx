"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArchiveGrid from "@/components/ArchiveGrid";
import Footer from "@/components/Footer";
import AcquisitionTicker from "@/components/Acquisition";
import { HolderGallery } from "@/components/HolderGallery";
import { CommandFAQ } from "@/components/CommandFAQ";
import ComingSoonDrop from "@/components/ComingSoonDrop";

export default function Home() {
  return (
    // Changed bg to white to make the ash-black Hero card "pop"
    <main className="relative min-h-screen w-full bg-white text-black selection:bg-[#FFD747]">
      
      {/* Navbar sits on the white background */}
      <Navbar />

      {/* Hero (Euro) Section - This is the Ash-Black Rounded Card */}
      <Hero />

      {/* Spacing wrapper to keep everything "fit" and clean */}
      <div className="space-y-24 pb-20">
        
       

        {/* Content sections now sit on white background like the sample */}
        <section className="px-4 md:px-6">
          <ArchiveGrid />
        </section>

        <AcquisitionTicker />
 <ComingSoonDrop />
        <section className="px-4 md:px-6">
          <HolderGallery />
        </section>

        <section className="px-4 md:px-6">
          <CommandFAQ />
        </section>

        <Footer />
      </div>
    </main>
  );
}