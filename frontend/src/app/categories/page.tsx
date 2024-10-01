'use client';

import * as React from "react";
import {CategoriesProvider} from "@/app/contexts/CategoriesContext";
import {CategoriesTable} from "@/app/components/tables/CategoriesTable";

export default function CategoriesPage() {
  return (
   <CategoriesProvider>
     <CategoriesTable/>
   </CategoriesProvider>
  )
}
