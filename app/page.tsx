"use client";

import { useTasks } from "@/lib/useTasks";
import Header from "@/app/_components/Header";
import TaskCard from "@/app/_components/TaskCard";

export default function BoardPage() {
  const { tasks } = useTasks();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          {tasks.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p>No tasks yet. Add one to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
