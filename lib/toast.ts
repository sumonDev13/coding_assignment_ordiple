"use client";

import { useSyncExternalStore } from "react";

export type ToastType = "success" | "info" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const autoDismissMs = 3000;
const listeners = new Set<() => void>();
let toasts: Toast[] = [];
let seq = 0;

function getSnapshot(): Toast[] {
  return toasts;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function addToast(message: string, type: ToastType = "info"): void {
  const id = seq++;
  toasts = [...toasts, { id, message, type }];
  emit();
  setTimeout(() => removeToast(id), autoDismissMs);
}

export function removeToast(id: number): void {
  const next = toasts.filter((t) => t.id !== id);
  if (next.length === toasts.length) return;
  toasts = next;
  emit();
}
