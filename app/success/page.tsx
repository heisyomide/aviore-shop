"use client";
import { useEffect, useState, useRef, Suspense } from "react"; // Added Suspense
import { useSearchParams, useRouter } from "next/navigation";
import { useArchive } from "@/context/ArchiveContext";
import { verifyPayment } from "@/app/actions/verify";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

// 1. Move your UI logic into a separate internal component
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { archive, clearArchive } = useArchive();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const hasVerified = useRef(false);

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    
    if (transactionId && !hasVerified.current) {
      hasVerified.current = true;
      
      verifyPayment(transactionId, archive).then((res) => {
        if (res && res.success) {
          setStatus("success");
          clearArchive(); 
          setTimeout(() => router.push("/shop"), 5000);
        } else {
          setStatus("error");
        }
      });
    }
  }, [searchParams, archive, router, clearArchive]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono">
      {status === "verifying" && (
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto text-white/20" size={40} />
          <p className="uppercase tracking-[0.4em] text-[10px]">Verifying_Acquisition...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center space-y-6">
          <CheckCircle className="mx-auto text-white" size={48} strokeWidth={1} />
          <h1 className="text-5xl italic uppercase tracking-tighter">Payment_Successful</h1>
          <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
            The archive has been updated. Redirecting to catalogue...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center space-y-6">
          <XCircle className="mx-auto text-red-900/50" size={48} strokeWidth={1} />
          <h2 className="text-xl uppercase tracking-tighter italic text-red-500/80">Verification_Failed</h2>
          <button onClick={() => router.push("/shop")} className="px-12 py-4 text-[10px] uppercase tracking-[0.4em] bg-white text-black font-bold">
            Retry_Access
          </button>
        </div>
      )}
    </div>
  );
}

// 2. The main export wraps it in Suspense to fix the Vercel error
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-white/20" size={40} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}