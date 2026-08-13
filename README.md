# Task Board

A small, clean task manager built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Tasks are persisted to `localStorage` (no backend), with a `useSyncExternalStore` data layer that is hydration-safe.

- **Create / view / edit / delete** tasks (modals + validation)
- **Filter** by status and **search** by title (live)
- **Sort** by due date or priority (ascending/descending)
- **Status counts** on the filter bar (total + per status)
- **Dark mode** toggle (CSS-variable theming, persists preference) and a **responsive** layout
- **Loading** skeleton and contextual **empty** states
- **Toast** notifications for add/delete actions
- Verification per step: `tsc`, `eslint`, `next build`, plus a headless render check (no interactive E2E)

> Data lives entirely in `localStorage` and resets to a set of seed tasks when cleared.

## Getting Started

```bash
npm run dev   # http://localhost:3000
npm run build
npm run lint
npm test       # (placeholder until a test runner is added)
```

## Project structure

```
app/
  layout.tsx              # Root layout: metadata, data-theme, theme inline script
  page.tsx                # BoardPage — route, state orchestration, wiring
  globals.css             # CSS variables (light/dark), @theme inline mappings, keyframes
  _components/
    board/                # Board controls tied to the board page
      FilterBar.tsx       # status filter + live search + counts
      SortSelect.tsx      # sort-by due date / priority
    layout/
      Header.tsx          # Site header + actions slot
    tasks/
      TaskCard.tsx        # Single task card (status badge, priority, edit/delete)
      TaskForm.tsx        # Shared create/edit form with validation
      StatusBadge.tsx     # Colored status indicator
    ui/
      DarkModeToggle.tsx  # Light/dark toggle button
      LoadingState.tsx    # Skeleton grid while data hydrates
      EmptyState.tsx      # Reusable empty-state illustration + action
      Modal.tsx           # Accessible modal (Esc + click-outside close)
      Toaster.tsx         # Fixed top-right toast container
lib/
  types.ts                # Domain types + option lists (statuses, priorities, sort)
  utils.ts                # Pure helpers: labels, date formatting, sortTasks
  hooks/
    useTasks.ts           # localStorage data hook (useSyncExternalStore) + add/update/delete
    toast.ts              # useToasts hook + imperative addToast / removeToast (useSyncExternalStore)
```

Custom hooks live in `lib/hooks/` (`useTasks` for the task data layer, `useToasts` + the imperative `addToast`/`removeToast` for notifications); the `_` prefix on `app/_components/` keeps components out of the App Router route table. `lib/` meanwhile holds pure types (`types.ts`), pure utilities (`utils.ts`), and the data/state hooks (`hooks/`).
