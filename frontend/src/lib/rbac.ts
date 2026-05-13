import type { Role, RoleConfig } from "@/src/types";

export const ROLES: Record<Role, RoleConfig> = {
  admin:     { id:"admin",     label:"Administrator",  description:"Full system access — all modules",   color:"#4f8ef7", glow:"rgba(79,142,247,0.25)",   icon:"Shield",       defaultRoute:"/dashboard",           allowedModules:["dashboard","analytics","hr","finance","inventory","projects","reports","notifications","settings"] },
  hr:        { id:"hr",        label:"HR Manager",     description:"Human Resources module only",        color:"#a78bfa", glow:"rgba(167,139,250,0.25)",  icon:"Users",        defaultRoute:"/hr/dashboard",        allowedModules:["hr","analytics","notifications"] },
  finance:   { id:"finance",   label:"Finance Analyst",description:"Finance & GL module only",           color:"#34d399", glow:"rgba(52,211,153,0.25)",   icon:"DollarSign",   defaultRoute:"/finance/dashboard",   allowedModules:["finance","analytics","reports","notifications"] },
  inventory: { id:"inventory", label:"Supply Chain",   description:"Inventory & procurement only",       color:"#fbbf24", glow:"rgba(251,191,36,0.25)",   icon:"Package",      defaultRoute:"/inventory/dashboard", allowedModules:["inventory","analytics","notifications"] },
  projects:  { id:"projects",  label:"Project Manager",description:"Projects & milestones only",         color:"#f472b6", glow:"rgba(244,114,182,0.25)",  icon:"FolderKanban", defaultRoute:"/projects/dashboard",  allowedModules:["projects","analytics","notifications"] },
};

export const NAV_BY_ROLE: Record<Role, Array<{ label:string; href:string; icon:string; badge?:string }>> = {
  admin: [
    { label:"Dashboard",    href:"/dashboard",           icon:"LayoutDashboard" },
    { label:"Analytics",    href:"/analytics",           icon:"BarChart3", badge:"AI" },
    { label:"HR",           href:"/hr/dashboard",        icon:"Users" },
    { label:"Finance",      href:"/finance/dashboard",   icon:"DollarSign" },
    { label:"Inventory",    href:"/inventory/dashboard", icon:"Package" },
    { label:"Projects",     href:"/projects/dashboard",  icon:"FolderKanban" },
    { label:"Reports",      href:"/reports",             icon:"FileBarChart" },
    { label:"Notifications",href:"/notifications",       icon:"Bell" },
  ],
  hr:        [ { label:"HR Dashboard", href:"/hr/dashboard",        icon:"Users" },        { label:"Analytics", href:"/analytics", icon:"BarChart3" }, { label:"Notifications", href:"/notifications", icon:"Bell" } ],
  finance:   [ { label:"Finance",      href:"/finance/dashboard",   icon:"DollarSign" },   { label:"Analytics", href:"/analytics", icon:"BarChart3" }, { label:"Reports",       href:"/reports",       icon:"FileBarChart" }, { label:"Notifications", href:"/notifications", icon:"Bell" } ],
  inventory: [ { label:"Inventory",    href:"/inventory/dashboard", icon:"Package" },      { label:"Analytics", href:"/analytics", icon:"BarChart3" }, { label:"Notifications", href:"/notifications", icon:"Bell" } ],
  projects:  [ { label:"Projects",     href:"/projects/dashboard",  icon:"FolderKanban" }, { label:"Analytics", href:"/analytics", icon:"BarChart3" }, { label:"Notifications", href:"/notifications", icon:"Bell" } ],
};

export const canAccess    = (role: Role, module: string) => ROLES[role].allowedModules.includes(module);
export const getDefault   = (role: Role) => ROLES[role].defaultRoute;
