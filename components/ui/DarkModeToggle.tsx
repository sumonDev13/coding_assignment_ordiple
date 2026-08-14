"use client";

import { SunIcon, MoonIcon } from "@/components/icons";
import { useLayoutEffect } from "react";

export default function DarkModeToggle() {
  useLayoutEffect(() => {
    const cached = localStorage.getItem("theme");
    if (cached === "dark" || cached === "light") {
      document.documentElement.setAttribute("data-theme", cached);
    }
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
    >
      <SunIcon className="theme-sun" />
      <MoonIcon className="theme-moon" />
    </button>
  );
}

