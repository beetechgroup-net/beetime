"use client";
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";
import {PaginationModel} from "@/app/contexts/PaginationModel";
import {Project} from "@/app/interfaces/Project";

const ProjectsContext = createContext<{
  projects: Project[];
  total: number;
  fetchProjects: () => Promise<void>;
  loading: boolean;
  error: string | null | unknown;
  createProject: (project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  paginationModel: PaginationModel
  setPaginationModel: (paginationModel: PaginationModel) => void;
}>({
  projects: [],
  total: 0,
  fetchProjects: () => Promise.resolve(),
  loading: true,
  error: null,
  createProject: () => {
  },
  removeProject: () => {
  },
  paginationModel: {
    page: 1,
    pageSize: 10
  },
  setPaginationModel: (paginationModel: PaginationModel) => {
  }
});


export const ProjectsProvider = ({children}: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const {data: session} = useSession();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await api.get("/projects/member", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        params: {...paginationModel}
      });
      setTotal(data.total);
      setProjects(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, paginationModel]);

  const createProject = async (project: Project) => {
    setLoading(true);
    try {
      await api.post("/projects", project, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Project created successfully', {variant: 'success'});
      await fetchProjects();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/projects/${id}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Project deleted successfully', {variant: 'success'});
      await fetchProjects();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      fetchProjects()
    }
  }, [fetchProjects, paginationModel]);

  return (
      <ProjectsContext.Provider
          value={{
            projects,
            fetchProjects,
            loading,
            error,
            createProject,
            removeProject,
            total,
            paginationModel,
            setPaginationModel
          }}>
        {children}
      </ProjectsContext.Provider>
  );
};

export function useProjects() {
  const context = useContext(ProjectsContext)

  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }

  return context
}