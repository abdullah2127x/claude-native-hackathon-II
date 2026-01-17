/**
 * TaskList - List container for tasks
 * Spec: 001-todo-web-crud
 * Task: T088, T089
 */

"use client";

import React from "react";
import type { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggle: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function TaskList({ tasks, isLoading, onToggle, onEdit, onDelete }: TaskListProps) {
  if (isLoading && tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
