export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
}

export type NewTask = Omit<Task, "id">;
export type TaskUpdate = Partial<Omit<Task, "id">> & { id: string };

export const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export type SortKey = "dueDate" | "priority";
export type SortDir = "asc" | "desc";
export interface SortOption {
  key: SortKey;
  dir: SortDir;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { key: "dueDate", dir: "asc", label: "Due date — soonest first" },
  { key: "dueDate", dir: "desc", label: "Due date — latest first" },
  { key: "priority", dir: "desc", label: "Priority — high to low" },
  { key: "priority", dir: "asc", label: "Priority — low to high" },
];
