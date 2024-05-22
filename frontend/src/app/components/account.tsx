"use client";

// web3 imports
import {
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

// ui components
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const Account = () => {
  // web3 hooks
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  // default view
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={async () => openAccountModal?.()}>Account</Button>
      <Button onClick={openChainModal}>Network</Button>
    </Stack>
  );
};
