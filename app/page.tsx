"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArchiveGrid from "@/components/ArchiveGrid";
import Footer from "@/components/Footer";
import AcquisitionTicker from "@/components/Acquisition";
import { HolderGallery } from "@/components/HolderGallery";
import { CommandFAQ } from "@/components/CommandFAQ";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a]">
      {/* Navbar is scoped ONLY to this page */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Sections */}
      <div className="relative z-10">
        <ArchiveGrid />
      </div>

      <AcquisitionTicker />

      <HolderGallery />
      

      <CommandFAQ />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}