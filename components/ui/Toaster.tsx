"use client";

import { XIcon } from "@/components/icons";
import { useToasts, removeToast, type Toast, type ToastType } from "@/hooks/toast";

const typeBorder: Record<ToastType, string> = {
  success: "border-l-green-500",
  info: "border-l-blue-500",
  error: "border-l-red-500",
};

export default function Toaster() {
  const toasts = useToasts();
  return (
    <div
      className="fixed top-4 right-4 z-60 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {[...toasts].reverse().map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
function ToastItem({ toast }: { toast: Toast }) {
  return (
    <div
      className={
        "flex items-center gap-2.5 rounded-md border-l-4 bg-popover px-3.5 py-2 text-sm text-foreground shadow-lg animate-toast-in" +
        ` ${typeBorder[toast.type]}`
      }
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss"
        className="ml-auto rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted"
      >
        <XIcon />
      </button>
    </div>
  );
}

