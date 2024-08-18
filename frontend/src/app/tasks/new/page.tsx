"use client";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import {CreateTaskForm} from "@/components/tasks/new/create-task-form";

export default function Page(): React.JSX.Element {
  return (
      <Stack spacing={3}>
        <CreateTaskForm/>
      </Stack>
  );
}
