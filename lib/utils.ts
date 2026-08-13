import type { Task, TaskPriority, TaskStatus, SortDir, SortKey } from "./types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "./types";

export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function sortTasks(
  tasks: Task[],
  key: SortKey,
  dir: SortDir
): Task[] {
  return [...tasks].sort((a, b) => {
    if (key === "dueDate") {
      const da = a.dueDate ? new Date(a.dueDate).getTime() : null;
      const db = b.dueDate ? new Date(b.dueDate).getTime() : null;
      if (da === null && db === null) return 0;
      if (da === null) return 1;
      if (db === null) return -1;
      return dir === "asc" ? da - db : db - da;
    }
    const va = PRIORITY_ORDER[a.priority];
    const vb = PRIORITY_ORDER[b.priority];
    return dir === "asc" ? va - vb : vb - va;
  });
}

export function statusLabel(status: TaskStatus): string {
  return STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function priorityLabel(priority: TaskPriority): string {
  return PRIORITY_OPTIONS.find((o) => o.value === priority)?.label ?? priority;
}

export function formatDate(date?: string): string {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return date;
  }
}
