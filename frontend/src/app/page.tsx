"use client";

// next imports
import { useState } from 'react';

// ui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// internal components
import ConnectButton from "./components/button";
import SignInButton from "./components/signin";
import Profile from "./components/profile";
import Leaderboard from './components/leaderboard';

export default function Home() {
  // internal state
  const [state, setState] = useState<{ open: boolean; errorMessage: string | null }>({
    open: false,
    errorMessage: null,
  });

  const setOpen = (open: boolean, errorMessage: string | null) => {
    setState({ open, errorMessage });
  };

  // Example usage
  const handleOpen = (message: string) => setOpen(true, message);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false, null);
  }

  // default view
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignContent={"center"}
        height={"100vh"}
      >
        <Grid
          xs={10}
          sm={10}
          md={5}
          lg={5}
          xl={5}
          item
        >
          <Typography variant="h1" lineHeight={'0.9'} fontWeight={900} textTransform={'uppercase'} mb={3}>
            Join the<br/>
            <Typography
              component="span"
              variant="h1"
              lineHeight={'0.9'}
              fontWeight={900}
              textTransform={'uppercase'}
              sx={{
                color: '#1976d2'
              }}
            >
              cross-chain
            </Typography>
            <br/>revolution
          </Typography>
          <Typography variant="body1" fontSize={'1.15rem'} mb={4} color={'gray'}>
            You are just one click away. Connect your wallet to get started.
          </Typography>
          <Stack direction="row" spacing={2} mb={4}>
            <ConnectButton />
            <SignInButton onError={(message: string) => handleOpen(message)} />
          </Stack>
        </Grid>
        <Grid
          xs={10}
          sm={10}
          md={3}
          lg={3}
          xl={3}
          item
        >
          <Profile onError={(message: string) => handleOpen(message)} />
        </Grid>
        <Grid
          xs={10}
          sm={10}
          md={3}
          lg={3}
          xl={3}
          item
        >
          <Leaderboard onError={(message: string) => handleOpen(message)} />
        </Grid>
      </Grid>
      <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {state.errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
