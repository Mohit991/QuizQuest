import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/KKlogo.png'
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import profile from "../assets/user.png"

const settings = ['Profile', 'Progress', 'Logout'];

const ResponsiveAppBar = () => {
  const { clearContext } = useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);



  const navigate = useNavigate();

  const handleMouseEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleSelectOption = (route) => {
    navigate(`/${route}`);
    setActiveDropdown(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    clearContext();
    setOpenLogoutDialog(false);

    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };


  return (
    <AppBar className='appbar' sx={{ background: "#282828" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ margin: "0px 100px" }} disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
            <Link to="/"><img src={logo} height={45} /></Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box
                onMouseEnter={() => handleMouseEnter('trivia')}
                onMouseLeave={handleMouseLeave}
                sx={{ position: 'relative', marginRight: 2 }}
              >
                <Button sx={{ color: 'white' }}>Trivia</Button>
                {activeDropdown === 'trivia' && (
                  <select
                    size="3"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#fff',
                      boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
                      border: 'none',

                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onChange={(e) => handleSelectOption(e.target.value)}
                  >
                    <option className="appbar_option" value="option1">Random Option 1</option>
                    <option className="appbar_option" value="option2">Random Option 2</option>
                    <option className="appbar_option" value="option3">Random Option 3</option>
                  </select>
                )}
              </Box>

              <Box
                onMouseEnter={() => handleMouseEnter('quiz')}
                onMouseLeave={handleMouseLeave}
                sx={{ position: 'relative', marginRight: 2 }}
              >
                <Button sx={{ color: 'white' }}>Quiz</Button>
                {activeDropdown === 'quiz' && (
                  <select
                    size="3"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#fff',
                      boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
                      border: 'none',

                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onChange={(e) => handleSelectOption(e.target.value)}
                  >
                    <option className="appbar_option" value="option4">Technology</option>
                    <option className="appbar_option" value="option5">General Knowledge</option>
                    <option className="appbar_option" value="option6">English</option>
                  </select>
                )}
              </Box>

              <Box
                onMouseEnter={() => handleMouseEnter('leaderboard')}
                onMouseLeave={handleMouseLeave}
                sx={{ position: 'relative', marginRight: 2 }}
              >
                <Button sx={{ color: '#ffa116' }} onClick={() => handleSelectOption('leaderboards')}>Leaderboard</Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{height: 38, width: 38}} src={profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === 'Logout') {
                      handleSignOut();
                    } else if (setting === 'Progress') {
                      navigate('/user-progress');
                    }
                    else {
                      navigate('/user');
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
            <Dialog
              open={openLogoutDialog}
              onClose={handleCloseLogoutDialog}
              aria-labelledby="logout-dialog-title"
              aria-describedby="logout-dialog-description"
            >
              <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
              <DialogContent>
                <DialogContentText id="logout-dialog-description">
                  Are you sure you want to log out?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseLogoutDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmLogout} color="secondary">
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
