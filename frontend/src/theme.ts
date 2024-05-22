'use client';

// next imports
import { Roboto } from 'next/font/google';

// ui imports
import { createTheme } from '@mui/material/styles';

// default font config
const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;