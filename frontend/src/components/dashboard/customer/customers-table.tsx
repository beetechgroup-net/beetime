'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useSelection} from '@/hooks/use-selection';
import {Task} from "@/interfaces/Task";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import StopOutlinedIcon from '@mui/icons-material/StopOutlined';
import {TaskStatus} from "@/interfaces/TaskStatus";
import {DurationComponent} from "@/components/dashboard/customer/DurationComponent";
import {IconButton} from '@mui/material';
import {startTask} from "@/services/startTask";
import {stopTask} from "@/services/stopTask";
import {useTasks} from "@/contexts/tasksContext";
import dayjs from "dayjs";

function isPlayable(row: Task) {
  return row.status === TaskStatus.NOT_STARTED || row.status === TaskStatus.STOPPED
}

export function CustomersTable(): React.JSX.Element {
  const page = 0;
  const size = 5;
  const [duration, setDuration] = useState(0);
  const {tasks, fetchTasks, loading, error} = useTasks();

  useEffect(() => {
    duration > 0 && setTimeout(() => setDuration(duration + 1000), 1000);
  }, [duration]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  async function handleStopTask(task: Task) {
    await stopTask(task);
    fetchTasks();
  }

  async function handleStartTask(row: Task) {
    await startTask(row);
    fetchTasks();
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Finish Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row: Task) => {
              return (
                <TableRow hover key={row.id} selected={false}>
                  <TableCell padding="checkbox">
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.startTime ? dayjs(row.startTime).format('MM-DD-YYYY HH:mm') : "-"}</TableCell>
                  <TableCell>{row.stopTime ? dayjs(row.stopTime).format('MM-DD-YYYY HH:mm') : "-"}</TableCell>
                  <TableCell><DurationComponent task={row}/></TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "left" }}>
                      { isPlayable(row) && <IconButton><PlayArrowOutlinedIcon color="success" onClick={() => handleStartTask(row)}/></IconButton>}
                      {!isPlayable(row) && <IconButton><StopOutlinedIcon color="error" onClick={() => handleStopTask(row)}/></IconButton>}

                      {/*<IconButton>*/}
                      {/*  <CreateOutlinedIcon color="info" onClick={() => removeTask(row.id)}/>*/}
                      {/*</IconButton>*/}

                      {/*<IconButton>*/}
                      {/*  <DeleteOutlinedIcon color="warning" onClick={() => removeTask(row.id)}/>*/}
                      {/*</IconButton>*/}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {/*<TablePagination*/}
      {/*  component="div"*/}
      {/*  count={count}*/}
      {/*  onPageChange={noop}*/}
      {/*  onRowsPerPageChange={noop}*/}
      {/*  page={page}*/}
      {/*  rowsPerPage={rowsPerPage}*/}
      {/*  rowsPerPageOptions={[5, 10, 25]}*/}
      {/*/>*/}
    </Card>
  );
}
