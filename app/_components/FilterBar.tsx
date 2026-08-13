"use client";

import type { TaskStatus } from "@/lib/types";
import { STATUS_OPTIONS } from "@/lib/types";
import { statusLabel } from "@/lib/utils";

export type StatusFilter = "all" | TaskStatus;

const dotConfig: Record<TaskStatus, string> = {
  todo: "bg-todo",
  "in-progress": "bg-in-progress",
  done: "bg-done",
};

interface FilterBarProps {
  status: StatusFilter;
  onStatus: (status: StatusFilter) => void;
  query: string;
  onQuery: (query: string) => void;
}

export default function FilterBar({ status, onStatus, query, onQuery }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search tasks by title..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search tasks"
        />
      </div>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by status">
        <FilterButton
          label="All"
          value="all"
          active={status === "all"}
          onClick={() => onStatus("all")}
        />
        {STATUS_OPTIONS.map((opt) => (
          <FilterButton
            key={opt.value}
            label={statusLabel(opt.value)}
            value={opt.value}
            active={status === opt.value}
            onClick={() => onStatus(opt.value)}
            dot={dotConfig[opt.value]}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  value: string;
  active: boolean;
  dot?: string;
  onClick: () => void;
}

function FilterButton({ label, value, active, dot, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      value={value}
      onClick={onClick}
      className={
        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors" +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:bg-muted")
      }
    >
      {dot ? <span className={`block h-1.5 w-1.5 rounded-full ${dot}`} /> : null}
      {label}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
