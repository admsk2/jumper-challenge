/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// next imports
import { useEffect, useState } from "react";

// web3 imports
import { useAccount, useBalance, useEnsName } from "wagmi";
import { formatUnits } from "viem";

// ui components
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';


// internal components
import { Account } from "./account";
import { formatEthereumAddress } from "@/lib/utils";

export default function Profile({ onError }: { onError: any }) {
  // account state
  const { address, chain, isConnected } = useAccount();

  // internal state
  const [userBalances, setUserBalances] = useState([]);

  // web3 hooks
  const { data } = useBalance({
    address,
  });

  const ens = useEnsName({
    address,
  });

  // custom hook
  useEffect(() => {
    const handler = async () => {
      if (!address) return
      try {
        const balancesRes = await fetch(`http://localhost:8080/balances/${address}`, {
          method: 'GET',
          credentials: 'include',
        })
        const balancesResJson = await balancesRes.json()
        const userBalancesRaw = await balancesResJson.responseObject
        const userBalancesFormatted = JSON.parse(userBalancesRaw)
        setUserBalances(userBalancesFormatted)
      } catch (error) {
        onError('Error fetching balances. Tokens list not available.')
      }
    }
    // 1. page loads
    handler()
}, [address])

  // state machine for connection
  if (!isConnected) {
    return (
      <Stack spacing={1} sx={{ width: 350 }}>
        <Skeleton variant="rectangular" width={350} height={200} />
        <Skeleton variant="rectangular" width={350} height={20} />
        <Skeleton variant="rectangular" width={250} height={20} />
      </Stack>
    )
  }

  // default view
  return (
    <Grid container>
      <Grid item xs={10} sm={10} md={8} lg={10} xl={6}>
        <Card>
          <CardContent>
            {address ?
              <Tooltip title={address}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {formatEthereumAddress(address)}{ens.data && `• (${ens.data})`}
                </Typography>
              </Tooltip> :
              <Typography variant="body2" color="text.secondary" gutterBottom>
                -
              </Typography>
            }
            {data ?
              <Typography variant="h5" component="div">
                {Number(formatUnits(data.value, data.decimals)).toFixed(4)}{" "}
                {data.symbol}
              </Typography> :
              <Typography variant="h5" component="div">
                -
              </Typography>
            }
            {chain?.name ?
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {chain?.name}
              </Typography> :
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                -
              </Typography>
            }
            <Account tokensList={userBalances} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}