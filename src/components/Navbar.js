import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // If using react-router-dom for navigation

function Navbar() {
const navigate = useNavigate();

  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar sx={{justifyContent:"space-around"}}>
          <Link to="/all-blogs" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">All Blogs</Button>
          </Link>
          <Link to="/add-blog" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Add Blog</Button>
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
            <Button color="inherit" onClick={() => {localStorage.removeItem("refreshToken"); navigate("/")}} >Logout</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;