"use client";
import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useArchive } from "@/context/ArchiveContext";
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearArchive } = useArchive();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const txRef = searchParams.get("tx_ref") || "INTERNAL_ERROR";

  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const paymentStatus = searchParams.get("payment");
    const msg = searchParams.get("msg");

    if (paymentStatus === "success") {
      setStatus("success");
      clearArchive();
      // Wait slightly longer for the user to read the confirmation
      setTimeout(() => router.push("/shop"), 8000);
    } else if (paymentStatus === "error" || paymentStatus === "failed") {
      setStatus("error");
      setErrorMessage(msg ? decodeURIComponent(msg) : "Payment processing failed.");
    } else {
      setStatus("error");
      setErrorMessage("Unauthorized_Portal_Access");
    }
  }, [searchParams, router, clearArchive]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
      {/* Decorative Archival Border */}
      <div className="fixed inset-4 border border-white/5 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {status === "verifying" && (
          <motion.div 
            key="verifying"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <Loader2 className="animate-spin mx-auto text-white/10" size={32} strokeWidth={1} />
            <p className="uppercase tracking-[0.5em] text-[9px] text-white/40">Synchronizing_Archive...</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg space-y-12"
          >
            <header className="text-center space-y-4">
              <CheckCircle className="mx-auto text-white mb-8" size={60} strokeWidth={0.5} />
              <h1 className="text-6xl md:text-7xl font-light italic uppercase tracking-tighter leading-none">
                Acquisition <br /> Confirmed
              </h1>
            </header>

            <div className="bg-[#0a0a0a] border border-white/5 p-8 font-mono relative overflow-hidden">
               {/* Watermark */}
               <div className="absolute top-2 right-4 text-[40px] opacity-[0.02] font-bold select-none italic">AVIORÉ</div>
               
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">Ref_ID</span>
                    <span className="text-[10px] uppercase tracking-widest">{txRef}</span>
                  </div>
                  
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">Status</span>
                    <span className="text-[10px] uppercase tracking-widest text-green-500">Authenticated_Log</span>
                  </div>

                  <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed pt-4">
                    The transaction manifest has been finalized and dispatched to your return channel. 
                    Physical items are now entering the dispatch queue.
                  </p>
               </div>
            </div>

            <footer className="flex flex-col items-center gap-8">
              <button
                onClick={() => router.push("/shop")}
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.6em] text-white/60 hover:text-white transition-colors"
              >
                <span>Return_to_Catalogue</span>
                <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                <ArrowRight size={12} />
              </button>
            </footer>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <XCircle className="mx-auto text-red-900/40" size={60} strokeWidth={0.5} />
            <div className="space-y-2">
              <h2 className="text-3xl italic uppercase tracking-tighter">System_Error</h2>
              <p className="text-[9px] text-red-500/50 uppercase tracking-[0.3em]">{errorMessage}</p>
            </div>
            <button
              onClick={() => router.push("/shop")}
              className="px-10 py-4 text-[9px] uppercase tracking-[0.5em] border border-white/10 hover:bg-white hover:text-black transition-all duration-500"
            >
              Back_to_System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SuccessContent />
    </Suspense>
  );
}