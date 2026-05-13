"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError("");

    if (password !== confirmPw) {
      setLocalError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(username, email, password);
      router.push("/auth/mfa");
    } catch {
      // error is set in the store
    }
  };

  const displayError = localError || error;

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    borderRadius: "12px",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/bg-img.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="w-full max-w-[420px] p-[40px] text-center"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            fontSize: "42px",
            fontWeight: 600,
            color: "#1e3a8a",
            letterSpacing: "2px",
            marginBottom: "8px",
            display: "inline-block",
          }}
        >
          ERP
        </div>
        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "28px" }}>
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="text-left w-full space-y-[18px]">
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Username
            </label>
            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
              className="w-full p-[14px_16px] text-[14px] outline-none transition-all placeholder:text-[#9ca3af] text-[#1f2937]"
              style={inputStyle}
              onFocus={(e) => { e.target.style.background = "rgba(255,255,255,0.8)"; e.target.style.borderColor = "#6366f1"; }}
              onBlur={(e) => { e.target.style.background = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.8)"; }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email"
              required
              className="w-full p-[14px_16px] text-[14px] outline-none transition-all placeholder:text-[#9ca3af] text-[#1f2937]"
              style={inputStyle}
              onFocus={(e) => { e.target.style.background = "rgba(255,255,255,0.8)"; e.target.style.borderColor = "#6366f1"; }}
              onBlur={(e) => { e.target.style.background = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.8)"; }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Password
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Create a password (min 6 chars)"
              required
              className="w-full p-[14px_16px] text-[14px] outline-none transition-all placeholder:text-[#9ca3af] text-[#1f2937]"
              style={inputStyle}
              onFocus={(e) => { e.target.style.background = "rgba(255,255,255,0.8)"; e.target.style.borderColor = "#6366f1"; }}
              onBlur={(e) => { e.target.style.background = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.8)"; }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Confirm Password
            </label>
            <input
              id="register-confirm-password"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="w-full p-[14px_16px] text-[14px] outline-none transition-all placeholder:text-[#9ca3af] text-[#1f2937]"
              style={inputStyle}
              onFocus={(e) => { e.target.style.background = "rgba(255,255,255,0.8)"; e.target.style.borderColor = "#6366f1"; }}
              onBlur={(e) => { e.target.style.background = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.8)"; }}
            />
          </div>

          {displayError && (
            <p className="text-[13px] font-medium text-center" style={{ color: "#e11d48", background: "rgba(255,241,242,0.7)", padding: "10px", borderRadius: "10px" }}>
              {displayError}
            </p>
          )}

          <button
            id="register-submit"
            type="submit"
            disabled={isLoading}
            className="w-full p-[14px] mt-[10px] text-[16px] font-medium text-white border-none rounded-[50px] cursor-pointer transition-transform hover:scale-[1.01] hover:brightness-[1.1] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #a855f7 100%)",
              boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
            }}
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="text-[14px] font-semibold transition-colors"
            style={{ color: "#1e3a8a", background: "none", border: "none", cursor: "pointer" }}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
