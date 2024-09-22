"use client";
import {GridColDef, GridOverlay} from "@mui/x-data-grid";
import * as React from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {useTasks} from "@/app/contexts/tasksContext";

function CustomNoRowsOverlay() {
  return (
      <GridOverlay sx={{backgroundColor: "white"}} role="row">
        <Box sx={{mt: 1}} role="gridcell">
          <Typography variant="h6" color="textSecondary">
            Nenhuma candidatura foi encontrada
          </Typography>
        </Box>
      </GridOverlay>
  )
}

export default function Table() {
  const {tasks, fetchTasks, loading, error} = useTasks();

  const columns: GridColDef<(typeof tasks)[number]>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      type: "number",
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      editable: true,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      sortable: false,
      width: 160,
    },
    {
      field: 'stopTime',
      headerName: 'Stop Time',
      sortable: false,
      width: 160,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      sortable: false,
      width: 160,
    },
  ];

  return (
      // <Box sx={{height: 400, width: '100%', backgroundColor: 'background.secondary '}}>
      //   <DataGrid
      //       rows={tasks}
      //       getRowId={(row: Task) => row.id}
      //       columns={columns}
      //       initialState={{
      //         pagination: {
      //           paginationModel: {
      //             pageSize: 5,
      //           },
      //         },
      //       }}
      //       pageSizeOptions={[5]}
      //       checkboxSelection
      //       disableRowSelectionOnClick
      //       slots={{
      //         noRowsOverlay: CustomNoRowsOverlay,
      //       }}
      //   />
      // </Box>
      (tasks.length === 0) ? (
          tasks.map((task) => (
              <div key={task.id}>
                <div>{task.id}</div>
                <div>{task.description}</div>
                <div>{task.category}</div>
                <div>{task.status}</div>
                <div>{task.startTime}</div>
                <div>{task.stopTime}</div>
                <div>{task.duration}</div>
              </div>
          ))
      ) : (
          <div>Loading...</div>
      ))
}