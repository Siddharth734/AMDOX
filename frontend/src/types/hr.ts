export type EmployeeStatus = "active" | "inactive" | "on-leave";
export type Department = "Engineering" | "HR" | "Finance" | "Operations" | "Design" | "Product" | "Analytics";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: Department;
  location: string;
  status: EmployeeStatus;
  salary: number;
  joined: string;
  avatar?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "annual" | "sick" | "personal";
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
}

export interface PayrollSummary {
  totalPayroll: number;
  processed: number;
  pending: number;
  runDate: string;
}
