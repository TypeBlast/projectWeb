import React from 'react';
import { Button, Typography, Container } from '@mui/material';

function Index() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to React with Vite and Material UI
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a simple page using Material UI components.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => alert('Button Clicked!')}>
        Click Me
      </Button>
    </Container>
  );
}

export default Index;
