import * as React from 'react';
import {TasksTable} from "@/app/components/tables/TasksTable";
import {TasksProvider} from "@/app/contexts/TasksContext";


export default function TasksPage() {
  return (
      <TasksProvider>
        <TasksTable/>
      </TasksProvider>
  );
}