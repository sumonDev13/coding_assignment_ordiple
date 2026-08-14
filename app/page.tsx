"use client";

import { useMemo, useState } from "react";
import type { NewTask, Task } from "@/lib/types";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { addToast } from "@/hooks/toast";
import { sortTasks } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Modal from "@/components/ui/Modal";
import TaskCard from "@/features/tasks/components/TaskCard";
import TaskForm from "@/features/tasks/components/TaskForm";
import FilterBar, { type StatusFilter } from "@/features/tasks/components/FilterBar";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import SortSelect, { type SortValue } from "@/features/tasks/components/SortSelect";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import Toaster from "@/components/ui/Toaster";

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function BoardPage() {
  const { tasks, addTask, updateTask, deleteTask, isLoading } = useTasks();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortValue | null>(null);

  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (statusFilter !== "all" && task.status !== statusFilter) return false;
        const q = searchQuery.trim().toLowerCase();
        if (q && !task.title.toLowerCase().includes(q)) return false;
        return true;
      }),
    [tasks, statusFilter, searchQuery],
  );

  const displayTasks = useMemo(
    () => (sort ? sortTasks(visibleTasks, sort.key, sort.dir) : visibleTasks),
    [visibleTasks, sort],
  );

  const handleCreate = (task: NewTask) => {
    if (addTask(task)) {
      setCreateOpen(false);
      addToast(`Task "${task.title}" added`, "success");
    } else {
      addToast("Failed to add task", "error");
    }
  };

  const handleEdit = (task: NewTask) => {
    if (!editingTask) return;
    if (updateTask({ ...task, id: editingTask.id })) {
      setEditingTask(null);
      addToast(`Task "${task.title}" updated`, "success");
    } else {
      addToast("Failed to update task", "error");
    }
  };

  const handleDelete = () => {
    if (!deletingTask) return;
    const { id, title } = deletingTask;
    if (deleteTask(id)) {
      setDeletingTask(null);
      addToast(`Task "${title}" deleted`, "info");
    } else {
      addToast("Failed to delete task", "error");
    }
  };

  const counts = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      "in-progress": tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks],
  );

  return (
    <>
      <Header
        actions={
          <>
            <DarkModeToggle />
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <PlusIcon />
              Add Task
            </button>
          </>
        }
      />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <FilterBar
            status={statusFilter}
            onStatus={setStatusFilter}
            query={searchQuery}
            onQuery={setSearchQuery}
            counts={counts}
          />
          <div className="mt-4 flex justify-end">
            <SortSelect value={sort} onChange={setSort} />
          </div>
          <div className="mt-6">
            {isLoading ? (
              <LoadingState />
            ) : displayTasks.length === 0 ? (
              <EmptyState
                title={tasks.length === 0 ? "No tasks yet" : "No tasks match"}
                description={
                  tasks.length === 0
                    ? "Add a task to get started."
                    : "Try adjusting your status filter or search term."
                }
                action={
                  tasks.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => setCreateOpen(true)}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      <PlusIcon />
                      Add Task
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setStatusFilter("all");
                        setSearchQuery("");
                        setSort(null);
                      }}
                      className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      Clear filters
                    </button>
                  )
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => setEditingTask(task)}
                    onDelete={() => setDeletingTask(task)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add Task">
        <TaskForm onSubmit={handleCreate} onCancel={() => setCreateOpen(false)} />
      </Modal>

      <Modal open={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
        {editingTask ? (
          <TaskForm
            key={editingTask.id}
            initialTask={editingTask}
            submitLabel="Save changes"
            onSubmit={handleEdit}
            onCancel={() => setEditingTask(null)}
          />
        ) : null}
      </Modal>

      <Modal
        open={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        title="Delete task?"
      >
        {deletingTask ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              Are you sure you want to delete{" "}
              <strong className="font-medium">&quot;{deletingTask.title}&quot;</strong>
              ? This can&apos;t be undone.
            </p>
            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setDeletingTask(null)}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Toaster />
    </>
  );
}
