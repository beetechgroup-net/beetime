"use client"
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, IconButton, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import StopOutlinedIcon from '@mui/icons-material/StopOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import dayjs from 'dayjs';
import {Task} from "@/app/interfaces/Task";
import {prettify, TaskStatus} from "@/app/interfaces/TaskStatus";
import {useTasks} from "@/app/contexts/TasksContext";
import {DurationComponent} from "@/app/components/tables/DurationComponent";
import {Category} from "@/app/interfaces/Category";

function isPlayable(row: Task) {
  return row.status === TaskStatus.NOT_STARTED || row.status === TaskStatus.STOPPED;
}

export function TasksTable() {
  const { tasks, fetchTasks, startTask, stopTask, loading, error, removeTask } = useTasks();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    duration > 0 && setTimeout(() => setDuration(duration + 1000), 1000);
  }, [duration]);

  async function handleStopTask(task: Task) {
    await stopTask(task);
    fetchTasks();
  }

  async function handleStartTask(row: Task) {
    await startTask(row);
    fetchTasks();
  }

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category', width: 150, valueFormatter: (params: Category) => params.name },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'status', headerName: 'Status', width: 150, valueFormatter: (params) => prettify(params) },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 180,
      valueFormatter: (params) => params ? dayjs(params).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      field: 'stopTime',
      headerName: 'Finish Time',
      width: 180,
      valueFormatter: (params) => params ? dayjs(params).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 100,
      renderCell: (params) => <DurationComponent task={params.row} />,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            {isPlayable(params.row) && (
                <IconButton onClick={() => handleStartTask(params.row)}>
                  <PlayArrowOutlinedIcon color="success" />
                </IconButton>
            )}
            {!isPlayable(params.row) && (
                <IconButton onClick={() => handleStopTask(params.row)}>
                  <StopOutlinedIcon color="error" />
                </IconButton>
            )}
            {/*<IconButton>*/}
            {/*  <CreateOutlinedIcon color="info" onClick={() => removeTask(params.row.id)} />*/}
            {/*</IconButton>*/}
            <IconButton>
              <DeleteOutlinedIcon color="warning" onClick={() => removeTask(params.row.id)} />
            </IconButton>
          </Stack>
      ),
    },
  ];

  return (
      <Card style={{ height: 600, width: '100%' }}>
        <DataGrid
            rows={tasks}
            columns={columns}
            pagination
            loading={loading}
        />
      </Card>
  );
}
