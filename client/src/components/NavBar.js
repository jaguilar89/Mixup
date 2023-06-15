import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BackgroundLetterAvatar from './BackgroundLetterAvatar';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import logo from '../images/logo-transparent.png'

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const userFullName = user?.full_name

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
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
    <AppBar position='sticky' sx={{ bgcolor: '#ffffff', boxShadow: '1px' }}>
      <Container maxWidth>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, color: 'black' }}>
            <Link href='/home'>
              <img src={logo} width='200px' height='33px' alt='logo'/>
            </Link>
          </Box>


          {!user && (
            <Box sx={{ flexGrow: 0}}>
              <Button variant='contained' component='a' href='/login' sx={{marginRight: '20px'}}>Log In</Button>
              <Button variant='contained' component='a' href='/login/signup'>Sign Up</Button>
            </Box>
          )}
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                    variant='contained'
                    component='a'
                    href='/events/new'
                    sx={{marginRight: '20px'}}
                >
                  Create Event
                </Button>
              <Tooltip title='User Avatar'>
                <IconButton onClick={handleOpenUserMenu}>
                  <BackgroundLetterAvatar userFullName={userFullName} />
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
                  <Typography sx={linkStyle} textAlign='center' component='a' href={`/profile/${user.profile?.id}`}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={linkStyle} textAlign='center' component='a' href='logout'>Log Out {user.username}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
