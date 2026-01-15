"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for that "smooth/heavy" boutique feel
  const springConfig = { damping: 25, stiffness: 200 };
  const scrollX = useSpring(cursorX, springConfig);
  const scrollY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      style={{
        translateX: scrollX,
        translateY: scrollY,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}