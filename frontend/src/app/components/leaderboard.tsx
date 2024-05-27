"use client";

// web3 imports
import { useAccount, useBalance } from "wagmi";
import { useLiveQuery } from "dexie-react-hooks";
import { formatUnits } from "viem";

// internal imports
import { db } from '@/lib/db';

// ui components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { formatEthereumAddress } from '@/lib/utils';
interface User {
  address: string;
  balance: string;
}

export default function Leaderboard({ onError }: { onError: (error: string) => void }) {

  // account state
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  
  // leaderboard state
  const leaderboard: User[] | undefined = useLiveQuery(() => (db as any).users.toArray());
  const entryExists: User | undefined = leaderboard?.find((entry: User) => entry.address === address);
  if (!entryExists && address && data) {
    const balance: string = Number(formatUnits(data.value, data.decimals)).toFixed(4);
    (db as any).users.add({
      address,
      balance,
    });
  }

  if (!address || !leaderboard?.length) {
    return (
      <Stack spacing={1} sx={{ width: 250 }}>
        <Skeleton variant="rectangular" width={250} height={150} />
        <Skeleton variant="rectangular" width={250} height={20} />
        <Skeleton variant="rectangular" width={150} height={20} />
      </Stack>
    )
  }

  return (
      <Grid container>
          <Grid item xs={10} sm={10} md={11} lg={11} xl={11}>
              <TableContainer component={Paper}>
              <Table aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell align="right">Balance</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {leaderboard
                    .sort((a: User, b: User) => Number(b.balance) - Number(a.balance))
                    .slice(0, 10)
                    .map((row: User, index: number) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {formatEthereumAddress(row.address)}
                        </TableCell>
                        <TableCell align="right">{row.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
              </TableContainer>
          </Grid>
      </Grid>
  );
}