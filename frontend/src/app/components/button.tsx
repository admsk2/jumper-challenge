"use client";

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export const ConnectButton = () => {
  // account state
  const { isConnecting, address, isConnected, chain } = useAccount();

  // web3 hooks
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  // state machine for connection
  if (!isConnected) {
    return (
      <button
        onClick={async () => {
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        { isConnecting ? 'Connecting...' : 'Connect your wallet' }
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  // default view
  return (
    <div>
      <div
        onClick={async () => openAccountModal?.()}
      >
        <p>Account</p>
      </div>
      <button onClick={openChainModal}>
        Switch Networks
      </button>
    </div>
  );
};
