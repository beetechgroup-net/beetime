"use client";
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {Category} from "@/app/interfaces/Category";
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";
import {PaginationModel} from "@/app/contexts/PaginationModel";

const CategoriesContext = createContext<{
  categories: Category[];
  total: number;
  fetchCategories: () => Promise<void>;
  loading: boolean;
  error: string | null | unknown;
  createCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
  paginationModel: PaginationModel
  setPaginationModel: (paginationModel: PaginationModel) => void;
}>({
  categories: [],
  total: 0,
  fetchCategories: () => Promise.resolve(),
  loading: true,
  error: null,
  createCategory: () => {
  },
  removeCategory: () => {
  },
  paginationModel: {
    page: 1,
    pageSize: 10
  },
  setPaginationModel: (paginationModel: PaginationModel) => {
  }
});


export const CategoriesProvider = ({children}: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const {data: session} = useSession();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        params: {...paginationModel}
      });
      setTotal(data.total);
      setCategories(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, paginationModel]);

  const createCategory = async (category: Category) => {
    setLoading(true);
    try {
      await api.post("/categories", category, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Category created successfully', {variant: 'success'});
      await fetchCategories();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/categories/${id}`, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Category deleted successfully', {variant: 'success'});
      await fetchCategories();
    } catch (error) {
      setError(error);
      enqueueSnackbar("error", {variant: 'error'});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) {
      fetchCategories()
    }
  }, [fetchCategories, paginationModel]);

  return (
      <CategoriesContext.Provider
          value={{
            categories,
            fetchCategories,
            loading,
            error,
            createCategory,
            removeCategory,
            total,
            paginationModel,
            setPaginationModel
          }}>
        {children}
      </CategoriesContext.Provider>
  );
};

export function useCategories() {
  const context = useContext(CategoriesContext)

  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider")
  }

  return context
}