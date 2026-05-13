export type TransactionType = "income" | "expense";
export type TransactionStatus = "completed" | "pending" | "failed";
export type InvoiceStatus = "paid" | "unpaid" | "overdue" | "draft";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  category: string;
  vendor?: string;
}

export interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  issuedDate: string;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface FinanceSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayables: number;
  overdueInvoices: number;
}
