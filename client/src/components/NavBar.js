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
    <AppBar position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>LOGO</Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button>
              <Tooltip title='User Menu'>
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
                  <Typography sx={linkStyle} textAlign='center' component='a' href='login'>Log In</Typography>
                </MenuItem>
              </Menu>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
