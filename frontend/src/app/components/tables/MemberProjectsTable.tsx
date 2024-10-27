"use client"
import * as React from 'react';
import {Card, IconButton, Stack} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useCategories} from "@/app/contexts/CategoriesContext";
import dayjs from "dayjs";
import {useProjects} from "@/app/contexts/ProjectsContext";

export function MemberProjectsTable() {
  const {
    loading,
    error,
    projects,
    fetchProjects,
    removeCategory,
    total,
    paginationModel,
    setPaginationModel
  } = useProjects()

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'registrationDate', headerName: 'Registration Date', width: 200, valueFormatter: (params) => params ? dayjs(params).format('YYYY-MM-DD HH:mm:ss') : '-' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <IconButton>
              <DeleteOutlinedIcon color="warning" onClick={() => removeCategory(params.row.id)} />
            </IconButton>
          </Stack>
      ),
    },
  ];

  return (
      <Card style={{ height: 600, width: '100%' }}>
        <DataGrid
            rows={projects}
            columns={columns}
            rowCount={total}
            pageSizeOptions={[5, 10, 20]}
            paginationMode="server"
            pagination
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
        />
      </Card>
  );
}
