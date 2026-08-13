"use client";

import { type KeyboardEvent, type ReactNode, useEffect } from "react";

interface ModalProps {
  title?: ReactNode;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeydown as never);
    return () => document.removeEventListener("keydown", onKeydown as never);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      aria-label="Close"
      role="button"
      tabIndex={-1}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title ? (
          <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        ) : null}
        {children}
      </div>
    </div>
  );
}
