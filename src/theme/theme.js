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
    success: {
      main: "#00d44e"
    },
    text: {
      dark: "",
      light: "#FFFFF1",
      subtle: "#8c8c8c"
    }
  },
});

export default theme;
