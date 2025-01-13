import React, { useState, useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/images/logoKnowledgek.png';
import profile from '../assets/images/user.png';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Progress', 'Logout'];

const ResponsiveAppBar = () => {
  const { clearContext } = useContext(AppContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

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

  const handleSelectOption = (route) => {
    navigate(`/${route}`);
  };

  return (
    <AppBar className='appbar' sx={{ background: "#282828" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ margin: "0px 100px" }} disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link to="/"><img src={logo} height={45} alt="Logo" /></Link>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Spacer for desktop view */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          {/* Spacer to align items to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Leaderboard Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 5 }}>
            <Button sx={{ color: '#ffa116' }} onClick={() => handleSelectOption('leaderboards')}>
              Leaderboards
            </Button>
          </Box>

          {/* Profile Avatar and Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" sx={{ height: 38, width: 38 }} src={profile} />
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
                    } else {
                      navigate('/user');
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Logout Confirmation Dialog */}
            <Dialog
              open={openLogoutDialog}
              onClose={handleCloseLogoutDialog}
              aria-labelledby="logout-dialog-title"
              aria-describedby="logout-dialog-description"
              PaperProps={{
                style: {
                  backgroundColor: '#282828',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <DialogTitle id="logout-dialog-title" sx={{ color: '#ffa116' }}>
                Confirm Logout
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="logout-dialog-description" sx={{ color: '#eff1f6bf' }}>
                  Are you sure you want to log out?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseLogoutDialog}
                  sx={{
                    color: '#eff1f6bf',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmLogout}
                  sx={{
                    backgroundColor: '#ffa1161f',
                    color: '#ffa116',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 161, 22, 0.3)',
                    },
                  }}
                >
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
