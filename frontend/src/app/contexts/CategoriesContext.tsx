"use client";
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {Category} from "@/app/interfaces/Category";
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";

// Create a context with a default value
const CategoriesContext = createContext<{
  categories: Category[];
  total: number;
  page: number;
  pageSize: number;
  fetchCategories: () => void;
  loading: boolean;
  error: string | null;
  createCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}>({
  categories: [],
  total: 0,
  page: 1,
  pageSize: 10,
  fetchCategories: () => {
  },
  loading: true,
  error: null,
  createCategory: () => {
  },
  removeCategory: () => {
  },
  setPage: () => {
  },
  setPageSize: () => {
  },
});


export const CategoriesProvider = ({children}: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const {data: session} = useSession();


  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        },
        params: {page, pageSize}
      });
      setTotal(data.total);
      setCategories(data.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [page, session?.accessToken, pageSize]);

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
    fetchCategories();
  }, [page, pageSize, fetchCategories]);

  return (
      <CategoriesContext.Provider
          value={{
            categories,
            fetchCategories,
            loading,
            error,
            createCategory,
            removeCategory,
            setPage,
            setPageSize,
            total,
            page,
            pageSize
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