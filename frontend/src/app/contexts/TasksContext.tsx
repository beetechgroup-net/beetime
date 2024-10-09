"use client";
import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {Task} from "@/app/interfaces/Task";
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";
import {PaginationModel} from "@/app/contexts/PaginationModel";

// Create a context with a default value
const TaskContext = createContext<{
  tasks: Task[];
  total: number;
  fetchTasks: () => void;
  loading: boolean;
  error: string | unknown | undefined;
  createTask: (task: Task) => void;
  startTask: (task: Task) => void;
  stopTask: (task: Task) => void;
  removeTask: (id: string) => void;
  paginationModel: PaginationModel
  setPaginationModel: (paginationModel: PaginationModel) => void;
}>({
  tasks: [],
  total: 0,
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
  },
  paginationModel: {
    page: 1,
    pageSize: 10
  },
  setPaginationModel: (paginationModel: PaginationModel) => {
  }
});


export const TasksProvider = ({children}: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | unknown | undefined>();
  const {data: session} = useSession();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        params: {...paginationModel}
      });
      setTotal(data.total);
      setTasks(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, paginationModel]);

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
          value={{
            tasks,
            fetchTasks,
            loading,
            error,
            createTask,
            startTask,
            stopTask,
            removeTask,
            paginationModel,
            setPaginationModel,
            total
      }}>
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
