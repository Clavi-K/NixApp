"use client"

import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import theme from '@/theme/theme';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const userToken = localStorage.getItem("nixAccessToken")
    console.log(jwtDecode(userToken))
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Next.js with MUI
          </Typography>

        </Box>
      </Container>
    </ThemeProvider>
  );
}

