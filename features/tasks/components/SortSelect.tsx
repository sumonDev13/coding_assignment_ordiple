"use client";

import { SORT_OPTIONS, type SortDir, type SortKey, type SortOption } from "@/types/types";

export interface SortValue {
  key: SortKey;
  dir: SortDir;
}

interface SortSelectProps {
  value: SortValue | null;
  onChange: (value: SortValue | null) => void;
}

const NONE = "none";

function serialize(option: Pick<SortOption, "key" | "dir">): string {
  return `${option.key}:${option.dir}`;
}

function parse(value: string): SortValue | null {
  if (value === NONE) return null;
  const [key, dir] = value.split(":") as [SortKey, SortDir];
  return { key, dir };
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Sort:</span>
      <select
        value={value ? serialize(value) : NONE}
        onChange={(e) => onChange(parse(e.target.value))}
        className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        aria-label="Sort tasks"
      >
        <option value={NONE}>None</option>
        {SORT_OPTIONS.map((option) => (
          <option key={serialize(option)} value={serialize(option)}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
