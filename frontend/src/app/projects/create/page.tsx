'use client';

import * as React from "react";
import CreateProjectForm from "@/app/components/forms/sections/CreateProjectForm";
import {ProjectsProvider} from "@/app/contexts/ProjectsContext";

export default function CreateProjectPage() {
  return (
   <ProjectsProvider>
     <CreateProjectForm/>
   </ProjectsProvider>
  )
}
