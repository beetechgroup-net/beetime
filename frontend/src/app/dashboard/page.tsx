'use client';

import {Paper, Typography} from "@mui/material";

export default function DashboardPage() {
  return (
      <Paper sx={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: 'white',
      }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Dashboard
        </Typography>
      </Paper>
  );
}
