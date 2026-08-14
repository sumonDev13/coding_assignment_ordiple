"use client";

import type { TaskStatus } from "@/types/types";
import { statusLabel } from "@/lib/utils";

const dotConfig: Record<TaskStatus, string> = {
  todo: "bg-todo",
  "in-progress": "bg-in-progress",
  done: "bg-done",
};

const textConfig: Record<TaskStatus, string> = {
  todo: "text-todo",
  "in-progress": "text-in-progress",
  done: "text-done",
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium" +
        ` ${textConfig[status]}`
      }
    >
      <span className={`block h-2 w-2 rounded-full ${dotConfig[status]}`} />
      {statusLabel(status)}
    </span>
  );
}
