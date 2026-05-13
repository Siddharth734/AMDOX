"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/useAuthStore";
import { authService } from "@/src/services/authService";

const CODE_LEN = 6;

export default function MFAPage() {
  const router  = useRouter();
  const { pendingEmail, verifyOtp, isLoading } = useAuthStore();
  const [code, setCode]     = useState(Array(CODE_LEN).fill(""));
  const [loading,setLoading]= useState(false);
  const [error, setError]   = useState("");
  const [countdown,setCd]   = useState(105);
  const inputs = useRef<(HTMLInputElement|null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { inputs.current[0]?.focus(); }, []);
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCd(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Redirect if no pending email
  useEffect(() => {
    if (!pendingEmail) {
      router.replace("/auth/login");
    }
  }, [pendingEmail, router]);

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[i] = val; setCode(next); setError("");
    if (val && i < CODE_LEN - 1) {
       inputs.current[i+1]?.focus();
       setActiveIndex(i + 1);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
       inputs.current[i-1]?.focus();
       setActiveIndex(i - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,CODE_LEN);
    const next   = Array(CODE_LEN).fill("");
    digits.split("").forEach((d,i) => { next[i] = d; });
    setCode(next);
    const nextIndex = Math.min(digits.length, CODE_LEN-1);
    inputs.current[nextIndex]?.focus();
    setActiveIndex(nextIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const full = code.join("");
    if (full.length < CODE_LEN) return;
    setLoading(true);
    setError("");
    
    try {
      const success = await verifyOtp(full);
      if (success) {
        router.push("/auth/login");
      } else {
        setError("Invalid or expired OTP. Please try again.");
        setCode(Array(CODE_LEN).fill(""));
        inputs.current[0]?.focus();
        setActiveIndex(0);
      }
    } catch {
      setError("Verification failed. Please try again.");
      setCode(Array(CODE_LEN).fill(""));
      inputs.current[0]?.focus();
      setActiveIndex(0);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!pendingEmail || countdown > 0) return;
    try {
      await authService.resendOtp(pendingEmail);
      setCd(105);
      setCode(Array(CODE_LEN).fill(""));
      inputs.current[0]?.focus();
      setActiveIndex(0);
      setError("");
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const complete = code.every(d => d !== "");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/bg-img.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div
        style={{
          width: "440px",
          padding: "40px 30px",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(25px) saturate(180%)",
          WebkitBackdropFilter: "blur(25px) saturate(180%)",
          borderRadius: "30px",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "36px", fontWeight: 600, color: "#1e3a8a", letterSpacing: "2px", marginBottom: "20px" }}>
           ERP
        </div>
        
        <h2 style={{ fontSize: "22px", color: "#111827", marginBottom: "10px", fontWeight: "bold" }}>
           Email Verification
        </h2>
        <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.5, marginBottom: "30px", padding: "0 20px" }}>
           Enter the 6-digit OTP sent to <strong>{pendingEmail || "your email"}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "35px" }} onPaste={handlePaste}>
            {code.map((digit, i) => {
              const isActive = activeIndex === i;
              
              let inputStyle: React.CSSProperties = {
                width: "50px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.7)",
                borderRadius: "12px",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: 600,
                color: "#1e3a8a",
                outline: "none",
                transition: "all 0.3s ease"
              };

              if (isActive) {
                inputStyle = {
                  ...inputStyle,
                  background: "rgba(255, 255, 255, 0.6)",
                  border: "2px solid transparent",
                  backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #a855f7)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                  transform: "scale(1.05)"
                };
              }
              
              if (error) {
                inputStyle.border = "1px solid #f43f5e";
                inputStyle.color = "#e11d48";
                inputStyle.background = "rgba(255, 241, 242, 0.8)";
                inputStyle.backgroundImage = "none";
              }

              return (
                <input
                  key={i}
                  ref={el => { inputs.current[i] = el; }}
                  type="text" inputMode="numeric" maxLength={1} value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  onFocus={() => setActiveIndex(i)}
                  style={inputStyle}
                />
              );
            })}
          </div>

          {error && (
            <p style={{ color: "#e11d48", fontSize: "13px", fontWeight: 500, marginBottom: "15px", marginTop: "-20px" }}>
              {error}
            </p>
          )}

          <button
            id="mfa-submit"
            type="submit"
            disabled={!complete || loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "50px",
              background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #a855f7 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 500,
              cursor: (!complete || loading) ? "not-allowed" : "pointer",
              boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.4)",
              marginBottom: "25px",
              opacity: (!complete || loading) ? 0.7 : 1,
              transition: "transform 0.2s ease",
              transform: (!complete || loading) ? "none" : "translateY(-1px)"
            }}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Didn&apos;t receive the code?
            <button 
              type="button"
              disabled={countdown > 0}
              onClick={handleResend}
              style={{
                display: "block",
                width: "100%",
                marginTop: "5px",
                color: countdown > 0 ? "#9ca3af" : "#3b82f6",
                fontWeight: 600,
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: countdown > 0 ? "not-allowed" : "pointer"
              }}
            >
              Resend OTP {countdown > 0 ? `(Available in ${fmt(countdown)})` : ""}
            </button>
        </div>
      </div>
    </div>
  );
}
