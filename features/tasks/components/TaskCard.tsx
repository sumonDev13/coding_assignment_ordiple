"use client";

import { PencilIcon, TrashIcon } from "@/components/icons";
import type { Task } from "@/types/types";
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

