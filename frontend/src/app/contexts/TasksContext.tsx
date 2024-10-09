"use client";
import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {Task} from "@/app/interfaces/Task";
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";

// Create a context with a default value
const TaskContext = createContext<{
  tasks: Task[];
  fetchTasks: () => void;
  loading: boolean;
  error: string | unknown | undefined;
  createTask: (task: Task) => void;
  startTask: (task: Task) => void;
  stopTask: (task: Task) => void;
  removeTask: (id: string) => void;
}>({
  tasks: [],
  fetchTasks: () => {
  },
  loading: true,
  error: undefined,
  createTask: () => {
  },
  startTask: () => {
  },
  stopTask: () => {
  },
  removeTask: () => {
  }
});


export const TasksProvider = ({children}: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | unknown | undefined>();
  const {data: session} = useSession();

  const fetchTasks = useCallback(
      async (page = 0, size = 10) => {
        setLoading(true);
        try {
          const {data} = await api.get("/tasks", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
          setTasks(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }, [session?.accessToken]
  )

  useEffect(() => {
    if (session) {
      fetchTasks()
    }
  }, [session, fetchTasks])

  const createTask = async (task: Task) => {
    setLoading(true);
    try {
      await api.post("/tasks", task, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Task created successfully', {variant: 'success'});
      await fetchTasks();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const startTask = async (task: Task) => {
    setLoading(true);
    try {
      await api.put("/tasks/" + task.id + "/start", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      await fetchTasks();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const stopTask = async (task: Task) => {
    setLoading(true);
    try {
      await api.put("/tasks/" + task.id + "/stop", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      await fetchTasks();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id: string) => {
    setLoading(true);
    try {
      await api.delete("/tasks/" + id, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      await fetchTasks();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  return (
      <TaskContext.Provider
          value={{tasks, fetchTasks, loading, error, createTask, startTask, stopTask, removeTask}}>
        {children}
      </TaskContext.Provider>
  );
};


export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider")
  }

  return context
}
