"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/actions/adminAuth";

export default function AdminGate() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("AWAITING_CREDENTIALS");
  const router = useRouter();

  // The secret key - in a real app, this should be handled via a secure backend
  const SECRET_KEY = "AVR2026"; 

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("VERIFYING");

  const res = await adminLogin(input);

  if (res.success) {
    setStatus("ACCESS_GRANTED");
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1200);
  } else {
    setStatus("INVALID_KEY");
    setInput("");
    setTimeout(() => setStatus("AWAITING_CREDENTIALS"), 2000);
  }
};

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-white font-mono selection:bg-white selection:text-black">
      {/* Visual scanline effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === 'INVALID_KEY' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
            <h1 className="text-[10px] uppercase tracking-[0.5em] text-white/40">Terminal_Access_v4.0</h1>
          </div>
          <p className="text-[9px] text-white/20 uppercase tracking-widest">
            Unauthorized access is logged // IP: 192.168.1.1
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative border border-white/10 p-6 bg-white/[0.02] backdrop-blur-sm">
            <label className="block text-[8px] uppercase tracking-[0.4em] text-white/30 mb-4">
              Enter_Access_Protocol
            </label>
            <input
              autoFocus
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xl tracking-[1em] text-center uppercase"
              placeholder="••••••"
            />
          </div>
          
          <div className="flex justify-between items-center px-2">
            <span className={`text-[9px] uppercase tracking-widest ${
              status === 'INVALID_KEY' ? 'text-red-500' : 'text-white/20'
            }`}>
              Status: {status}
            </span>
            <button type="submit" className="hidden">Execute</button>
          </div>
        </form>

        {status === "ACCESS_GRANTED" && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center pt-8"
          >
            <p className="text-[10px] text-green-500 uppercase tracking-[0.5em] animate-pulse">
              Decrypting_Archive_Vault...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}