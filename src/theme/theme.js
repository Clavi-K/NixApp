"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // o 'light'
    primary: {
      main: '#bf1b1b',
    },
    secondary: {
      main: '#8c1212',
    },
  },
});

export default theme;
