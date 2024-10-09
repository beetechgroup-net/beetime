import * as React from 'react';
import {TasksProvider} from "@/app/contexts/TasksContext";
import {TasksTable} from "@/app/components/tables/TasksTable";


export default function TasksPage() {
  return (
      <TasksProvider>
        <TasksTable/>
      </TasksProvider>
  );

}