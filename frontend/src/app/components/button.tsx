"use client";

// web3 imports
import {
  useConnectModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

// ui components
import Button from '@mui/material/Button';
import CableIcon from '@mui/icons-material/Cable';
import WifiOffIcon from '@mui/icons-material/WifiOff';

export default function ConnectButton() {
  // account state
  const { isConnecting, isConnected, chain } = useAccount();

  // web3 hooks
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  // state machine for connection
  if (!isConnected) {
    return (
      <Button
        variant="contained"
        onClick={async () => {
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
        endIcon={<CableIcon />}
      >
        { isConnecting ? 'Connecting...' : 'Connect your wallet' }
      </Button>
    );
  }

  if (isConnected && !chain) {
    return (
      <Button variant="contained" color="error" onClick={openChainModal} endIcon={<WifiOffIcon />}>
        Wrong network
      </Button>
    );
  }

  // default view
  return (
    <Button disabled variant="contained" endIcon={<CableIcon />}>Connected</Button>
  );
};
