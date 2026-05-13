"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      router.push("/auth/select-role");
    } catch {
      // error is already set in the store
    }
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
        className="w-full max-w-[400px] p-[40px] text-center"
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
            marginBottom: "30px", 
            display: "inline-block"
          }}
        >
          ERP
        </div>

        <form onSubmit={handleSubmit} className="text-left w-full space-y-[20px]">
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email"
              required
              className="w-full p-[14px_16px] text-[14px] outline-none transition-all placeholder:text-[#9ca3af] text-[#1f2937]"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                borderRadius: "12px",
              }}
              onFocus={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.8)";
                e.target.style.borderColor = "#6366f1";
              }}
              onBlur={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.5)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.8)";
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-[14px_16px] text-[14px] outline-none transition-all placeholder:text-[#9ca3af] text-[#1f2937]"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                borderRadius: "12px",
              }}
              onFocus={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.8)";
                e.target.style.borderColor = "#6366f1";
              }}
              onBlur={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.5)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.8)";
              }}
            />
          </div>

          {error && (
            <p className="text-[13px] font-medium text-center" style={{ color: "#e11d48", background: "rgba(255,241,242,0.7)", padding: "10px", borderRadius: "10px" }}>
              {error}
            </p>
          )}

          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full p-[14px] mt-[10px] text-[16px] font-medium text-white border-none rounded-[50px] cursor-pointer transition-transform hover:scale-[1.01] hover:brightness-[1.1] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #a855f7 100%)",
              boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div 
          style={{ marginTop: "25px" }} 
          className="flex items-center justify-center gap-3 w-full"
        >
          <button 
            type="button" 
            className="flex-1 py-[10px] rounded-xl font-medium text-[13px] transition-all duration-300 border backdrop-blur-sm"
            style={{ 
              color: "#4b5563", 
              background: "rgba(255, 255, 255, 0.3)",
              borderColor: "rgba(255, 255, 255, 0.5)",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Forgot Password?
          </button>
          
          <button 
            type="button"
            onClick={() => router.push("/auth/register")}
            className="flex-1 py-[10px] rounded-xl font-semibold text-[13px] transition-all duration-300 border backdrop-blur-sm"
            style={{ 
              color: "#1e3a8a", 
              background: "rgba(59, 130, 246, 0.1)",
              borderColor: "rgba(59, 130, 246, 0.2)",
              boxShadow: "0 4px 6px -1px rgba(59,130,246,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
