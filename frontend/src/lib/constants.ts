export const APP_NAME    = "Amdox ERP";
export const APP_VERSION = "2.0.0";
export const APP_CODE    = "AMX-ERP-2026-04";
export const TENANT_ID   = "GLOBAL_PROD";

export const API_BASE_URL    = process.env.NEXT_PUBLIC_API_URL ?? "/api";
export const MFA_CODE_LENGTH = 6;
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

export const SIDEBAR_WIDTH_OPEN    = 224;
export const SIDEBAR_WIDTH_CLOSED  = 68;
export const NAVBAR_HEIGHT         = 64;

export const CHART_COLORS = {
  blue:    "#4f8ef7",
  violet:  "#a78bfa",
  emerald: "#34d399",
  amber:   "#fbbf24",
  rose:    "#f472b6",
  cyan:    "#06b6d4",
  muted:   "#5c667e",
} as const;

export const ROLE_COLORS = {
  admin:     "#4f8ef7",
  hr:        "#a78bfa",
  finance:   "#34d399",
  inventory: "#fbbf24",
  projects:  "#f472b6",
} as const;

export const DEMO_MFA_CODE = "123456";
