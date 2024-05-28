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

export default function Profile({ onError }: { onError: (error: string) => void }) {
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
      if (!address) return;
      try {
        // cleanup when account switches
        setUserBalances([]);
        const response = await fetch(`http://localhost:8080/balances/${address}`);
        const responseJson = await response.json();
    
        if (!responseJson.success) {
          onError(responseJson.responseObject);
          return;
        }
    
        setUserBalances(JSON.parse(responseJson.responseObject));
      } catch (error) {
        onError('Error fetching balances. Tokens list not available.');
      }
    };
    // 1. page loads
    handler()
}, [address])

  // state machine for connection
  if (!isConnected) {
    return (
      <Stack spacing={1} sx={{ width: 250 }}>
        <Skeleton variant="rectangular" width={250} height={150} />
        <Skeleton variant="rectangular" width={250} height={20} />
        <Skeleton variant="rectangular" width={150} height={20} />
      </Stack>
    )
  }

  // default view
  return (
    <Grid container>
      <Grid item xs={10} sm={10} md={12} lg={12} xl={12}>
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