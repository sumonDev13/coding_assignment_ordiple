"use client";

import type { Task } from "@/lib/types";
import { formatDate, priorityLabel } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

const priorityDot: Record<Task["priority"], string> = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

export interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs transition-shadow hover:shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 flex-1 truncate font-semibold" title={task.title}>
          {task.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          <StatusBadge status={task.status} />
          {onEdit ? (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Edit ${task.title}`}
              className="rounded-md p-1 text-muted-foreground opacity-0 shadow-sm hover:text-foreground hover:bg-muted group-hover:opacity-100"
            >
              <PencilIcon />
            </button>
          ) : null}
          {onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              aria-label={`Delete ${task.title}`}
              className="rounded-md p-1 text-muted-foreground opacity-0 shadow-sm hover:text-destructive hover:bg-muted group-hover:opacity-100"
            >
              <TrashIcon />
            </button>
          ) : null}
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-muted-foreground">{task.description}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className={`block h-1.5 w-1.5 rounded-full ${priorityDot[task.priority]}`} />
          {priorityLabel(task.priority)}
        </span>
        {task.dueDate && <span>Due {formatDate(task.dueDate)}</span>}
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19h7" />
      <path d="M16.34 13.66C17.2 12.8 17.7 11.73 17.7 10.61c0-2.94-2.4-5.34-5.34-5.34-1.12 0-2.19.5-2.97 1.28L2.7 13.96a1 1 0 0 0-.28 0.64v4.1a1 1 0 0 0 1 1l4.1-1.02a1 1 0 0 0 0.64-.28z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
      <path d="M9 6V4a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v2" />
    </svg>
  );
}
