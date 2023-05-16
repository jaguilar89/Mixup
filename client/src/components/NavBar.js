import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const linkStyle = {
    textDecoration: 'none',
    "&:hover": {
      color: 'inherit'
    },
    "&:visited": {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
  function handleOpenUserMenu(e) {
    setAnchorElUser(e.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='sticky' sx={{bgcolor: '#f5f5f5', boxShadow: '1px'}}>
      <Container maxWidth>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, color:'black' }}>LOGO</Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant='contained' component='a' href='/home'>Log In</Button>
            <Button variant='contained' component='a' href='/login/signup'>Sign Up</Button>
            <Button>
              <Tooltip title='USER AVATAR: THIS WILL RENDER ONLY WHEN A USER IS LOGGED IN'>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt='user menu' src='https://static.vecteezy.com/system/resources/thumbnails/011/598/471/small/google-logo-icon-illustration-free-vector.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{ mt: '45px' }}
              >
                <MenuItem>
                  <Typography sx={linkStyle} textAlign='center' component='a' href='profile'>Profile</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography sx={linkStyle} textAlign='center' component='a' href='account'>Account</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography sx={linkStyle} textAlign='center' component='a' href='login'>Log Out</Typography>
                </MenuItem>
              </Menu>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
