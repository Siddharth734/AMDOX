"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store";
import { ROLES } from "@/src/lib/rbac";
import type { Role } from "@/src/types";

export default function SelectRolePage() {
  const router = useRouter();
  const { setRole } = useAuthStore();
  const [selectedId, setSelectedId] = useState<Role | null>(null);

  const handleSelect = (roleId: Role) => {
    setSelectedId(roleId);
    setRole(roleId);
    setTimeout(() => {
      router.push(ROLES[roleId].defaultRoute);
    }, 450); // slight delay to show the glowing active state
  };

  const rolesList = [
    {
      id: "admin" as Role,
      icon: "/ADMIN_icon.png",
      name: "Admin",
      desc: "System configuration, user management, and global settings."
    },
    {
      id: "hr" as Role,
      icon: "/HR_icon.png",
      name: "HR",
      desc: "Employee lifecycle, payroll, and benefits management."
    },
    {
      id: "finance" as Role,
      icon: "/FINANCE_icon.png",
      name: "Finance",
      desc: "Accounting, invoicing, and comprehensive financial reporting."
    },
    {
      id: "inventory" as Role,
      icon: "/INVERTORY_icon.png",
      name: "Inventory",
      desc: "Stock level tracking, procurement, and warehouse logistics."
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Container for the whole section */
        .role-selection-wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 50px 20px;
            text-align: center;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-image: url('/bg-img.jpeg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
        }

        .role-selection-inner {
            width: 100%;
            max-width: 900px;
            animation: scale-in 0.35s ease forwards;
        }

        @keyframes scale-in {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        .erp-logo-small {
            font-size: 32px;
            font-weight: 600;
            color: #1e3a8a;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .title-header {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 40px;
        }

        /* Grid Layout */
        .role-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            margin-bottom: 40px;
        }

        /* Standard Glass Card */
        .role-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(15px) saturate(180%);
            -webkit-backdrop-filter: blur(15px) saturate(180%);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.6);
            padding: 30px;
            text-align: left;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 12px;
            position: relative;
            overflow: hidden;
        }

        /* The glowing "Inventory" card state */
        .role-card.selected {
            border: 2px solid transparent;
            background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
                              linear-gradient(135deg, #3b82f6, #a855f7);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        /* Subtle internal sheen for selected card */
        .role-card.selected::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 50%;
            background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
            pointer-events: none;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 15px;
            position: relative;
            z-index: 10;
        }

        .role-icon {
            font-size: 28px;
        }

        .role-name {
            font-size: 22px;
            font-weight: 600;
            color: #111827;
        }

        .role-description {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.5;
            margin-top: 5px;
            position: relative;
            z-index: 10;
        }

        .footer-note {
            font-size: 14px;
            color: #6b7280;
        }

        /* Hover effect for non-selected cards */
        .role-card:not(.selected):hover {
            background: rgba(255, 255, 255, 0.5);
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 12px 30px -5px rgba(168, 85, 247, 0.25);
            transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
            .role-grid { grid-template-columns: 1fr; }
        }
      ` }} />

      <div className="role-selection-wrapper">
          <div className="role-selection-inner">
              <div className="erp-logo-small">ERP</div>
              <h1 className="title-header">Select Your Role</h1>

              <div className="role-grid">
                  {rolesList.map((r) => (
                      <div 
                        key={r.id} 
                        className={`role-card ${selectedId === r.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(r.id)}
                      >
                          <div className="card-header">
                              <span className="role-icon" style={{ display: 'flex', alignItems: 'center' }}>
                                 <img 
                                   src={r.icon} 
                                   alt={r.name} 
                                   style={{ 
                                     width: "46px", 
                                     height: "46px", 
                                     objectFit: "contain", 
                                     flexShrink: 0,
                                     transform: r.id === "inventory" ? "scale(1.2)" : "none"
                                   }} 
                                 />
                              </span>
                              <span className="role-name">{r.name}</span>
                          </div>
                          <div className="role-description">
                              {r.desc}
                          </div>
                      </div>
                  ))}
              </div>

              <div className="footer-note">
                  Need to switch later? Access from Settings.
              </div>
          </div>
      </div>
    </>
  );
}
