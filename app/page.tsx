"use client";

import { useState } from "react";
import type { NewTask, Task } from "@/lib/types";
import { useTasks } from "@/lib/useTasks";
import Header from "@/app/_components/Header";
import Modal from "@/app/_components/Modal";
import TaskCard from "@/app/_components/TaskCard";
import TaskForm from "@/app/_components/TaskForm";

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
  const { tasks, addTask, updateTask } = useTasks();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreate = (task: NewTask) => {
    addTask(task);
    setCreateOpen(false);
  };

  const handleEdit = (task: NewTask) => {
    if (!editingTask) return;
    updateTask({ ...task, id: editingTask.id });
    setEditingTask(null);
  };

  return (
    <>
      <Header
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <PlusIcon />
            Add Task
          </button>
        }
      />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {tasks.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p>No tasks yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => setEditingTask(task)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add Task"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
        />
      </Modal>
      <Modal
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
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
    </>
  );
}
