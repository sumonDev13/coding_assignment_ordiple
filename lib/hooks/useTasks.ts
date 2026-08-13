"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";
import { NewTask, Task } from "../types";

const SEED_TASKS: Task[] = [
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
const LOADED_EVENT = `${STORAGE_KEY}:loaded`;


let mounted = false;


let loaded = false;

/** Cached snapshot so getSnapshot is referentially stable. */
let cachedRaw: string | null = null;
let cachedTasks: Task[] = SEED_TASKS;

function readTasks(): Task[] {
  if (!mounted) return SEED_TASKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedTasks = raw ? (JSON.parse(raw) as Task[]) : SEED_TASKS;
    }
    return cachedTasks;
  } catch {
    return SEED_TASKS;
  }
}

function writeTasks(tasks: Task[]): boolean {
  const json = JSON.stringify(tasks);
  try {
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
    return false;
  }
  cachedRaw = json;
  cachedTasks = tasks;
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return true;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getLoaded(): boolean {
  return loaded;
}

function subscribeLoaded(callback: () => void) {
  window.addEventListener(LOADED_EVENT, callback);
  return () => window.removeEventListener(LOADED_EVENT, callback);
}

export function useTasks() {
  const tasks = useSyncExternalStore(subscribe, readTasks, () => SEED_TASKS);
  const isLoading = !useSyncExternalStore(subscribeLoaded, getLoaded, () => false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    mounted = true;
    loaded = true;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    window.dispatchEvent(new Event(LOADED_EVENT));
  }, []);

  const addTask = useCallback((task: NewTask): boolean => {
    return writeTasks([...readTasks(), { ...task, id: crypto.randomUUID() }]);
  }, []);

  const updateTask = useCallback((task: Task): boolean => {
    return writeTasks(readTasks().map((t) => (t.id === task.id ? task : t)));
  }, []);

  const deleteTask = useCallback((id: string): boolean => {
    return writeTasks(readTasks().filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, updateTask, deleteTask, isLoading };
}
