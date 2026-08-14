import type { SVGProps } from "react";

export function InboxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="6" width="18" height="12" radius="2" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 15h8" />
    </svg>
  );
}
