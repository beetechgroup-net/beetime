"use client";
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Category} from "@/app/interfaces/Category";
import {useSession} from "next-auth/react";
import {api} from "@/app/lib/api";
import {enqueueSnackbar} from "notistack";

// Create a context with a default value
const CategoriesContext = createContext<{
  categories: Category[];
  fetchCategories: () => void;
  loading: boolean;
  error: string | null;
  createCategory: (category: Category) => void;
}>({
  categories: [],
  fetchCategories: () => {},
  loading: true,
  error: null,
  createCategory: () => {}
});


export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {data: session} = useSession();
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const {data} = await api.get("/categories", {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      setCategories(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Category) => {
    setLoading(true);
    try {
      await api.post("/categories", category, {headers: {Authorization: `Bearer ${session?.accessToken}`}});
      enqueueSnackbar('Category created successfully', {variant: 'success'});
      await fetchCategories();
    } catch (error) {
      setError(error);
      enqueueSnackbar(error, {variant: 'error'});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories().then(() => console.log(categories));
  }, []);

  return (
      <CategoriesContext.Provider value={{ categories, fetchCategories, loading, error, createCategory }}>
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