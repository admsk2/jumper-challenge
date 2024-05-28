"use client";

// next imports
import { useState } from "react";

// web3 imports
import {
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

// internal imports
import { roundToFourDecimals } from "@/lib/utils";

// ui components
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WalletIcon from '@mui/icons-material/Wallet';
import WifiIcon from '@mui/icons-material/Wifi';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// interfaces
interface Token {
  name: string;
  symbol: string;
  balance: number;
}

interface AccountProps {
  tokensList: Token[];
}

export const Account = ({ tokensList }: AccountProps) => {
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
    <Stack direction="row" spacing={2}>
      <Fab size="small" aria-label="tokens" onClick={toggleDrawer(true)} sx={{ 'boxShadow': 'none' }}>
        <AttachMoneyIcon />
      </Fab>
      <Fab size="small" aria-label="wallet" onClick={async () => openAccountModal?.()} sx={{ 'boxShadow': 'none' }}>
        <WalletIcon />
      </Fab>
      <Fab size="small" aria-label="network" onClick={openChainModal} sx={{ 'boxShadow': 'none' }}>
        <WifiIcon />
      </Fab>
    </Stack>
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {tokensList.length ?
            <List>
              {tokensList.map((token: Token, index: number) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        src={`/icons/${token.symbol}.png`}
                        sx={{ 'fontSize': '9px', 'fontWeight': '600', 'backgroundColor': 'black'}}
                      >
                      {token.symbol}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={token.name} secondary={roundToFourDecimals(token.balance)} sx={{ 'textAlign': 'right' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          :
          <p style={{ 'textAlign': 'center' }}>No tokens found.</p>
          }
      </Box>
    </Drawer>
    </>
  );
};