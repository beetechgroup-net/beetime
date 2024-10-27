'use client';

import * as React from "react";
import {CategoriesProvider} from "@/app/contexts/CategoriesContext";
import {CategoriesTable} from "@/app/components/tables/CategoriesTable";
import {ProjectsProvider} from "@/app/contexts/ProjectsContext";
import {MemberProjectsTable} from "@/app/components/tables/MemberProjectsTable";

export default function ProjectsPage() {
  return (
   <ProjectsProvider>
     <MemberProjectsTable />
   </ProjectsProvider>
  )
}
