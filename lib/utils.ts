import type { TaskPriority, TaskStatus } from "./types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "./types";

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
