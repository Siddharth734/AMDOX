"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ModalProps {
  open:      boolean;
  onClose:   () => void;
  title?:    string;
  children:  React.ReactNode;
  size?:     "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = { sm:"max-w-sm", md:"max-w-md", lg:"max-w-lg", xl:"max-w-2xl" };

export function Modal({ open, onClose, title, children, size = "md", className }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={cn(
          "w-full glass-strong rounded-2xl overflow-hidden animate-[scale-in_0.2s_ease_forwards]",
          sizeMap[size], className,
        )}
        style={{ boxShadow:"0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)" }}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
            <h3 className="text-[14px] font-semibold text-[#e4e9f5]">{title}</h3>
            <button onClick={onClose} aria-label="Close modal" className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5c667e] hover:text-white hover:bg-white/[0.06] transition-all">
              <X size={14} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
