import type { SVGProps } from "react";

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
      <path d="M9 6V4a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v2" />
    </svg>
  );
}
