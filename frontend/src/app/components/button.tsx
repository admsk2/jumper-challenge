"use client";

// web3 imports
import {
  useConnectModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

// ui components
import Button from '@mui/material/Button';
import Fingerprint from '@mui/icons-material/Fingerprint';

export const ConnectButton = () => {
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
        endIcon={<Fingerprint />}
      >
        { isConnecting ? 'Connecting...' : 'Connect your wallet' }
      </Button>
    );
  }

  if (isConnected && !chain) {
    return (
      <Button variant="contained" onClick={openChainModal}>
        Wrong network
      </Button>
    );
  }

  // default view
  return (
    <Button disabled variant="contained" endIcon={<Fingerprint />}>Connected</Button>
  );
};
