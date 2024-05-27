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

theme.typography.h1 = {
    fontSize: '4rem',
};

theme.typography.h1[theme.breakpoints.down('lg')] = {
    fontSize: '3rem',
};

theme.typography.h1[theme.breakpoints.down('md')] = {
    fontSize: '3.5rem',
};

theme.typography.h1[theme.breakpoints.down('sm')] = {
    fontSize: '2.5rem',
};

theme.typography.body1[theme.breakpoints.down('lg')] = {
    fontSize: '1rem',
};


export default theme;