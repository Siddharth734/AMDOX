// Auth & RBAC
export type { Role, User, RoleConfig, AuthState, LoginCredentials, MFAPayload } from "./auth";
// HR
export type { Employee, EmployeeStatus, Department, LeaveRequest, PayrollSummary } from "./hr";
// Finance
export type { Transaction, TransactionType, TransactionStatus, Invoice, InvoiceStatus, FinanceSummary } from "./finance";
// Projects
export type { Project, ProjectStatus, Priority, Task, TaskStatus, Milestone } from "./project";
// API
export type { ApiResponse, PaginatedResponse, ApiError, QueryParams } from "./api";

// Dashboard / Analytics inline types
export interface KPICard { id:string; label:string; value:number; formatted:string; change:number; trend:"up"|"down"; suffix:string; icon:string; color:"blue"|"violet"|"emerald"|"amber"|"rose"|"cyan"; }
export interface RevenuePoint  { month:string; revenue:number; expenses:number; profit:number; }
export interface DeptBudget    { dept:string; budget:number; spent:number; }
export interface ForecastPoint { week:string; predicted:number; actual:number|null; }
export interface ModuleUsage   { module:string; users:number; sessions:number; change:number; }
export interface ActivityItem  { id:number; type:"success"|"warning"|"info"|"error"; title:string; description:string; module:string; time:string; avatar:string; }
export interface AnalyticsMetric { label:string; value:string; change:number; trend:"up"|"down"; detail:string; }
export interface SLAItem        { label:string; value:number; target:number; unit:string; }
export interface AIInsight      { id:string; title:string; body:string; confidence:number; module:string; priority:"high"|"medium"|"low"; actionLabel:string; }
export interface HeatmapCell    { day:string; hour:number; value:number; }
export interface Notification   { id:string; title:string; body:string; time:string; read:boolean; kind:"success"|"warning"|"info"|"error"; module?:string; }
export interface QuickModule    { id:string; label:string; icon:string; href:string; description:string; color:string; stat:string; statLabel:string; }
