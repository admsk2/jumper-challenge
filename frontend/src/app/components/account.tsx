"use client";

// next imports
import { useState } from "react";

// web3 imports
import {
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

// ui components
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import WalletIcon from '@mui/icons-material/Wallet';
import WifiIcon from '@mui/icons-material/Wifi';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Account = ({ tokensList }) => {
  // web3 hooks
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  // internal state
  const [open, setOpen] = useState(false);

  // custom handler
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // default view
  return (
    <>
    <Stack direction="row" spacing={2}>
      {tokensList.length ?
      <Fab size="small" aria-label="tokens" onClick={toggleDrawer(true)} sx={{ 'boxShadow': 'none' }}>
        <AttachMoneyIcon />
      </Fab>
      :
      <Fab disabled size="small" aria-label="tokens" sx={{ 'boxShadow': 'none' }}>
        <AttachMoneyIcon />
      </Fab>
      }
      <Fab size="small" aria-label="wallet" onClick={async () => openAccountModal?.()} sx={{ 'boxShadow': 'none' }}>
        <WalletIcon />
      </Fab>
      <Fab size="small" aria-label="network" onClick={openChainModal} sx={{ 'boxShadow': 'none' }}>
        <WifiIcon />
      </Fab>
    </Stack>
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {tokensList.map((token: any, index: any) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={token.name} />
                <ListItemText primary={token.symbol} />
                <ListItemText primary={token.balance} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
    </>
  );
};
