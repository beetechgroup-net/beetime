'use client';

import {InputBase, Paper} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import * as React from "react";
import {CategoriesProvider} from "@/app/contexts/CategoriesContext";
import CreateTaskForm from "@/app/components/forms/sections/CreateTaskForm";
import {TasksProvider} from "@/app/contexts/TasksContext";

function CustomizedInputBase() {
  return (
      <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            backgroundColor: '#F5F6FA',
            borderRadius: 5,
            border: '1px solid #E5E7EB',
          }}

      >
        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
          <SearchOutlinedIcon/>
        </IconButton>

        <InputBase
            sx={{ml: 1, flex: 1}}
            placeholder="Search"
            inputProps={{'aria-label': 'search'}}
        />

      </Paper>
  );
}

export default function CategoriesPage() {
  return (
   <CategoriesProvider>
     <TasksProvider>
       <CreateTaskForm/>
     </TasksProvider>
   </CategoriesProvider>
  )
}
