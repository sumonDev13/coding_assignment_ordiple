# Task Board

A small, clean task manager where you can create, view, edit, delete, filter, search, sort, and toggle dark mode for your tasks. Built one meaningful step at a time, with manual commits after each step.

- **CRUD** tasks in a modal form with validation (title required, min 3 chars, priority/status/due date).
- **Filter** by status (All / To Do / In Progress / Done) and **search** by title — both live.
- **Sort** by due date (soonest/latest) or priority (high→low / low→high), with no-due-date tasks always sorted last.
- **Counts** shown on the filter bar (total + per status).
- **Dark mode** toggle (CSS-variable theming, persists preference, follows OS by default) and a **responsive** layout.
- **Loading** skeleton + contextual **empty** states ("No tasks yet" / "No tasks match").
- **Toast** notifications (top-right, animated) for add/edit/delete, including red error toasts if a save fails (the modal stays open so you can retry).

> Data is stored in the browser's `localStorage` and pre-seeded with a few sample tasks. Clearing your browser storage resets the board.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **ESLint 9** with `eslint-config-next`
- React built-ins, with a `useSyncExternalStore` data layer for `localStorage` (hydration-safe, no `setState` in effects)
- **Zero runtime UI libraries** — icons are inline SVGs

> Note: `next/font` was removed in favor of a system font stack to fix a hydration mismatch under Turbopack dev; Tailwind's `@config` CSS block is avoided (broken in the installed plugin version) in favor of `@theme inline`.

## How to run locally

```bash
npm install
npm run dev      # -> http://localhost:3000
npm run build    # production build
npm run lint     # eslint + tsc
```

Verification (per step): `tsc --noEmit`, `eslint .`, `next build`, and a headless render check of the page HTML. Interactive click-through testing was intentionally skipped (no Playwright/Puppeteer), pending the user's decision on a test runner.

## Project structure

```
app/
  _components/
    board/   FilterBar, SortSelect
    layout/  Header
    tasks/   TaskCard, TaskForm, StatusBadge
    ui/      DarkModeToggle, EmptyState, LoadingState, Modal, Toaster
  layout.tsx        # metadata, data-theme, theme inline script
  page.tsx          # BoardPage — route + state orchestration
  globals.css       # CSS variables (light/dark), @theme mappings, keyframes
lib/
  types.ts          # domain types + option lists
  utils.ts          # pure helpers: labels, date formatting, sortTasks
  hooks/            # useTasks (localStorage store), useToasts + addToast/removeToast
```

## Assumptions & choices

- **No backend** — the spec was a "simplified task manager," so data lives in `localStorage` only (persists across refresh in the same browser; not across devices or after clearing storage).
- **No authentication / accounts.**
- **No unit tests yet** — a test runner was not installed; I asked before adding one (the user deferred). The plan is Vitest + `@testing-library/react` for util + component tests.
- **Dark mode** uses CSS variables (not Tailwind's `dark:` utilities, which are media-based and don't respond to a manual toggle).
- **Not deployed** — I did not push to Vercel/Netlify. If you'd like, a one-click Vercel deploy works out of the box with `npm run build`.
