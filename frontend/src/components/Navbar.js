import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rural Pregnancy App
        </Typography>
        <Button color="inherit" component={Link} to="/health-worker">Health Worker</Button>
        <Button color="inherit" component={Link} to="/mother">Mother</Button>
        <Button color="inherit" component={Link} to="/official-personnel">Official Personnel</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
