"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import {Task} from "@/app/interfaces/Task";
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";

// Create a context with a default value
const TaskContext = createContext<{
  tasks: Task[];
  fetchTasks: () => void;
  loading: boolean;
  error: string | null;
  createTask: (task: Task) => void;
  startTask: (task: Task) => void;
  stopTask: (task: Task) => void;
}>({
  tasks: [],
  fetchTasks: () => {},
  loading: true,
  error: null,
  createTask: () => {},
  startTask: () => {},
  stopTask: () => {}
});


export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {data: session} = useSession();
  const fetchTasks = async (page = 0, size = 10) => {
    setLoading(true);
    try {
      const {data } = await api.get("/tasks", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      setTasks(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Task) => {
    console.log("createTask")
    console.log(task)
    setLoading(true);
    console.log("antes")
    try {
      console.log("try")
      await api.post("/tasks", task, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Task created successfully', {variant: 'success'});
      await fetchTasks();
    } catch (error) {
      console.log("catch")
      setError(error);
      enqueueSnackbar(error, {variant: 'error'});
    } finally {
      console.log("finally")
      setLoading(false);
    }
  };

  const startTask = async (task: Task) => {
    console.log("startTask")
    console.log(task)
    setLoading(true);
    try {
      await api.put("/tasks/" + task.id + "/start", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      await fetchTasks();
    } catch (error) {
      console.log("catch")
      setError(error);
      enqueueSnackbar(error, {variant: 'error'});
    } finally {
      console.log("finally")
      setLoading(false);
    }
  };

  const stopTask = async (task: Task) => {
    console.log("stopTask")
    console.log(task)
    setLoading(true);
    try {
      await api.put("/tasks/" + task.id + "/stop", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      await fetchTasks();
    } catch (error) {
      console.log("catch")
      setError(error);
      enqueueSnackbar(error, {variant: 'error'});
    } finally {
      console.log("finally")
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks().then(() => console.log(tasks));
  }, []);

  return (
      <TaskContext.Provider value={{ tasks, fetchTasks, loading, error, createTask, startTask, stopTask }}>
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
