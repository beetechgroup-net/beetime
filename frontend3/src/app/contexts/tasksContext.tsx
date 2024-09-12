"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import {Task} from "@/app/interfaces/Task";
import {findAllTasksPaged} from "@/app/services/findAllTasksPaged";

// Create a context with a default value
const TaskContext = createContext<{
  tasks: Task[];
  fetchTasks: () => void;
  loading: boolean;
  error: string | null;
}>({
  tasks: [],
  fetchTasks: () => {},
  loading: true,
  error: null
});

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async (page = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await findAllTasksPaged(page, size);
      setTasks(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
      <TaskContext.Provider value={{ tasks, fetchTasks, loading, error }}>
        {children}
      </TaskContext.Provider>
  );
};
