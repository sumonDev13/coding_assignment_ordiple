"use client";

import { useState } from "react";
import type { NewTask, TaskPriority, TaskStatus } from "@/types/types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/types/types";

export interface TaskFormProps {
  initialTask?: Partial<NewTask>;
  submitLabel?: string;
  onSubmit: (task: NewTask) => void;
  onCancel: () => void;
}

const priorityDot: Record<TaskPriority, string> = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

const statusDot: Record<TaskStatus, string> = {
  todo: "bg-todo",
  "in-progress": "bg-in-progress",
  done: "bg-done",
};

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";

export default function TaskForm({
  initialTask,
  submitLabel = "Save",
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(initialTask?.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(
    initialTask?.priority ?? "medium",
  );
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? "todo");
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate ? initialTask.dueDate.slice(0, 10) : "",
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    setError("");
    onSubmit({
      title: trimmed,
      description: description.trim() || undefined,
      priority,
      status,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim().length >= 3) setError("");
          }}
          placeholder="What needs to be done?"
          className={inputCls}
          required
          minLength={3}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          className={inputCls}
          rows={3}
        />
      </div>

      <fieldset className="flex flex-col gap-1">
        <legend className="text-sm font-medium">Priority</legend>
        <div className="flex flex-wrap gap-2">
          {PRIORITY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <input
                type="radio"
                name="priority"
                checked={priority === opt.value}
                onChange={() => setPriority(opt.value)}
                className="accent-primary"
              />
              <span
                className={`block h-2 w-2 rounded-full ${priorityDot[opt.value]}`}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-1">
        <legend className="text-sm font-medium">Status</legend>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            >
              <input
                type="radio"
                name="status"
                checked={status === opt.value}
                onChange={() => setStatus(opt.value)}
                className="accent-primary"
              />
              <span
                className={`block h-2 w-2 rounded-full ${statusDot[opt.value]}`}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1">
        <label htmlFor="dueDate" className="text-sm font-medium">
          Due date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={inputCls}
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
