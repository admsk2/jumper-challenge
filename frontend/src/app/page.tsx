// ui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// internal components
import ConnectButton from "./components/button";
import SignInButton from "./components/signin";
import Profile from "./components/profile";

export default function Home() {
  // default view
  return (
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignContent={"center"}
        height={"100vh"}
      >
        <Grid
          xs={6}
          md={5}
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
          <Stack direction="row" spacing={2}>
            <ConnectButton />
            <SignInButton />
          </Stack>
        </Grid>
        <Grid
          xs={6}
          md={5}
        >
          <Profile />
        </Grid>
      </Grid>
  );
}
