// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hospital Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          <Button component={Link} to="/signup" color="inherit">Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
