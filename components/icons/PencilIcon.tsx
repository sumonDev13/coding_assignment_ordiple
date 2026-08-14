import type { SVGProps } from "react";

export function PencilIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 19h7" />
      <path d="M16.34 13.66C17.2 12.8 17.7 11.73 17.7 10.61c0-2.94-2.4-5.34-5.34-5.34-1.12 0-2.19.5-2.97 1.28L2.7 13.96a1 1 0 0 0-.28 0.64v4.1a1 1 0 0 0 1 1l4.1-1.02a1 1 0 0 0 0.64-.28z" />
    </svg>
  );
}
