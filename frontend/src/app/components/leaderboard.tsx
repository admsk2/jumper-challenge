
// next imports
import { useEffect, useState } from 'react';

// web3 imports
import { useAccount, useBalance } from "wagmi";

// internal libs
import { Stores, User, addData, deleteData, getStoreData, initDB } from '@/lib/db';

// ui components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function createData(
  address: string,
  balance: number,
) {
  return { address, balance };
}

const rows = [
  createData('0xdead', 1),
  createData('vitalik.eth', 237),
];

export default function BasicTable({  onError }: { onError: any}) {

    // account state
    const { address, chain, isConnected } = useAccount();

    // internal state
    const [isDBReady, setIsDBReady] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]|[]>([]);

    const handleGetUsers = async () => {
        const users = await getStoreData<User>(Stores.Users);
        setUsers(users);
    };

    const handleInitDB = async () => {
        const status = await initDB();
        setIsDBReady(!!status);
    };

    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const target = e.target as typeof e.target & {
          name: { value: string };
          email: { value: string };
        };
    
        const name = target.name.value;
        const email = target.email.value;
        const id = Date.now();
    
        if (name.trim() === '' || email.trim() === '') {
          alert('Please enter a valid name and email');
          return;
        }
    
        try {
          const res = await addData(Stores.Users, { name, email, id });
          // refetch users after creating data
          handleGetUsers();
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Something went wrong');
          }
        }
    };

    // custom hook
    useEffect(() => {
        const handler = async () => {
            try {
                await handleInitDB();
                // await handleGetUsers();
            } catch (error) {
                console.log(error);
                onError('Error fetching users. Leaderboard not available.')
            }
        }
        // 1. page loads
        handler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    {rows.map((row) => (
                        <TableRow
                        key={row.address}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.address}
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