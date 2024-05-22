"use client";

// web3 imports
import { useAccount, useBalance, useEnsName } from "wagmi";
import { formatUnits } from "viem";

// ui components
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

// internal components
import { Account } from "./account";
import { formatEthereumAddress } from "@/lib/utils";

export default function Profile() {
  // account state
  const { address, chain, isConnected } = useAccount();
  

  // web3 hooks
  const { data } = useBalance({
    address,
  });

  const ens = useEnsName({
    address,
  });

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
    <Card sx={{ width: 350 }}>
      <CardContent>
        {address ?
          <Tooltip title={address}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {formatEthereumAddress(address)}
            </Typography>
          </Tooltip> :
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
        {ens.data ?
          <Typography variant="body2">
            {ens.data}
          </Typography> :
          <Typography variant="body2">
            No ENS name for given wallet 🧐            
          </Typography>
        }
      </CardContent>
      <CardActions>
        <Account />
      </CardActions>
    </Card>
  );
}