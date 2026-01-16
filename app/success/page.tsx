// app/success/page.tsx
"use client";
import { useEffect, useState, Suspense, useRef } from "react"; // ← Add useRef
import { useSearchParams, useRouter } from "next/navigation";
import { useArchive } from "@/context/ArchiveContext";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearArchive } = useArchive();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ← Add this ref to prevent multiple executions
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent running more than once
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const paymentStatus = searchParams.get("payment");
    const msg = searchParams.get("msg");

    if (paymentStatus === "success") {
      setStatus("success");
      clearArchive();
      setTimeout(() => router.push("/shop"), 5000);
    } else if (paymentStatus === "error" || paymentStatus === "failed") {
      setStatus("error");
      setErrorMessage(msg ? decodeURIComponent(msg) : "Payment processing failed. Please try again.");
    } else {
      setStatus("error");
      setErrorMessage("Invalid access to success page.");
    }
  }, [searchParams, router, clearArchive]); // Dependencies are fine

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
          {errorMessage && (
            <p className="text-[10px] text-red-500/60 uppercase tracking-widest">
              {errorMessage}
            </p>
          )}
          <button
            onClick={() => router.push("/shop")}
            className="px-12 py-4 text-[10px] uppercase tracking-[0.4em] bg-white text-black font-bold"
          >
            Return_to_Shop
          </button>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="animate-spin text-white/20" size={40} />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}