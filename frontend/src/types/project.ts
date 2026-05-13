export type ProjectStatus = "planning" | "in-progress" | "completed" | "on-hold";
export type Priority = "critical" | "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface Project {
  id: string;
  name: string;
  lead: string;
  team: number;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  budget: number;
  spent: number;
  dueDate: string;
  tasks: { total: number; done: number };
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  completed: boolean;
}
