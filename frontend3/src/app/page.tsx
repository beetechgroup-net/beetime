'use client';

import {signIn, signOut, useSession} from 'next-auth/react';
import {Divider, Grid2, InputBase, Paper, Stack, Typography} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

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

export default function HomePage() {
  const {data: session, status} = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }


  return (
      <div>
        {!session ? (
            <button onClick={() => signIn('keycloak')}>Sign in with Keycloak</button>
        ) : (
            <></>
        )}
      </div>


  );
}
