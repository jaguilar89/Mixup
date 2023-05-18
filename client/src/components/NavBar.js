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
import PersonIcon from '@mui/icons-material/Person';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();

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

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch('/api/logout', {
      method: "DELETE"
    })
    if (res.ok) {
      setUser(null)
      navigate('/')
    }
  }

  return (
    <AppBar position='sticky' sx={{ bgcolor: '#f5f5f5', boxShadow: '1px' }}>
      <Container maxWidth>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, color: 'black' }}>LOGO</Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user && (
              <>
                <Button variant='contained' component='a' href='/login'>Log In</Button>
                <Button variant='contained' component='a' href='/login/signup'>Sign Up</Button>
              </>
            )}
            {user && (
              <IconButton onClick={handleOpenUserMenu}>
                <Tooltip title='USER AVATAR: THIS WILL RENDER ONLY WHEN A USER IS LOGGED IN'>
                  <Avatar alt='user menu'>
                    <PersonIcon />
                  </Avatar>
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
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={linkStyle} textAlign='center' component='a' href='logout'>Log Out {user.username}</Typography>
                  </MenuItem>
                </Menu>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
