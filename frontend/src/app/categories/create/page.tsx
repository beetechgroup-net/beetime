'use client';

import {InputBase, Paper} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import * as React from "react";
import {CategoriesProvider} from "@/app/contexts/CategoriesContext";
import CreateTaskForm from "@/app/components/forms/sections/CreateTaskForm";
import CreateCategoryForm from "@/app/components/forms/sections/CreateCategoryForm";
export default function CategoriesPage() {
  return (
   <CategoriesProvider>
     <CreateCategoryForm/>
   </CategoriesProvider>
  )
}
