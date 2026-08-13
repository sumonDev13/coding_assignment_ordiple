"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";
import { NewTask, Task } from "./types";

export const SEED_TASKS: Task[] = [
  {
    id: "1",
    title: "Design Task Board UI",
    description: "Mockup the main board layout and task cards.",
    priority: "medium",
    status: "done",
    dueDate: "2026-08-10",
  },
  {
    id: "2",
    title: "Set up data persistence",
    description: "Persist tasks to localStorage so they survive refresh.",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-08-13",
  },
  {
    id: "3",
    title: "Add dark mode support",
    description: "Toggle between light and dark themes.",
    priority: "low",
    status: "todo",
  },
  {
    id: "4",
    title: "Write project readme",
    description: "Document architecture decisions and how to run.",
    priority: "low",
    status: "todo",
  },
];

const STORAGE_KEY = "task-board:tasks";
const CHANGE_EVENT = `${STORAGE_KEY}:change`;

/**
 * Module-level gate so the first client render matches the server render,
 * avoiding hydration mismatches while still reflecting persisted data.
 */
let mounted = false;

function readTasks(): Task[] {
  if (!mounted) return SEED_TASKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : SEED_TASKS;
  } catch {
    return SEED_TASKS;
  }
}

function writeTasks(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* ignore write errors (e.g. quota) */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function useTasks() {
  const tasks = useSyncExternalStore(subscribe, readTasks, () => SEED_TASKS);

  useEffect(() => {
    mounted = true;
    try {
      if (typeof localStorage === "undefined") return;
      if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TASKS));
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      /* no-op */
    }
  }, []);

  const addTask = useCallback((task: NewTask) => {
    writeTasks([...readTasks(), { ...task, id: crypto.randomUUID() }]);
  }, []);

  const updateTask = useCallback((task: Task) => {
    writeTasks(readTasks().map((t) => (t.id === task.id ? task : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    writeTasks(readTasks().filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, updateTask, deleteTask, isLoaded: mounted };
}
