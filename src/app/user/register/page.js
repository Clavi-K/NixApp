import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import theme from '@/theme/theme';

export default function Home() {
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
