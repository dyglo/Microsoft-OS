import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/tasks';

const STORAGE_KEY = 'windows_tasks';

function load(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as Task[]) : [];
}

function save(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(load());
  }, []);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    save(updated);
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t);
    setTasks(updated);
    save(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    save(updated);
  };

  const renameTask = (id: string, title: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, title, updatedAt: Date.now() } : t);
    setTasks(updated);
    save(updated);
  };

  return { tasks, addTask, toggleTask, deleteTask, renameTask };
}
