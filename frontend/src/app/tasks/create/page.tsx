'use client';

import * as React from "react";
import {CategoriesProvider} from "@/app/contexts/CategoriesContext";
import CreateTaskForm from "@/app/components/forms/sections/CreateTaskForm";
import {TasksProvider} from "@/app/contexts/TasksContext";

export default function CategoriesPage() {
  return (
   <CategoriesProvider>
     <TasksProvider>
       <CreateTaskForm/>
     </TasksProvider>
   </CategoriesProvider>
  )
}
