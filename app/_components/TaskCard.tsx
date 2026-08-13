import type { Task } from "@/lib/types";
import { formatDate, priorityLabel } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs transition-shadow hover:shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="text-sm text-muted-foreground">{task.description}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span
            className={
              "block h-1.5 w-1.5 rounded-full" +
              (task.priority === "high"
                ? "bg-priority-high"
                : task.priority === "medium"
                ? "bg-priority-medium"
                : "bg-priority-low")
            }
          />
          {priorityLabel(task.priority)}
        </span>
        {task.dueDate && <span>Due {formatDate(task.dueDate)}</span>}
      </div>
    </div>
  );
}
