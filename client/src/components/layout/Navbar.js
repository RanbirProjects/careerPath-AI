import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    transform: 'translateY(-2px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: active ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
    width: '80%',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.3s ease',
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: theme.spacing(4),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  border: `2px solid ${theme.palette.primary.main}`,
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    boxShadow: '0 0 0 2px white',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/profile', label: 'Profile', icon: <PersonIcon /> },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <StyledAvatar src={user?.avatar} alt={user?.name}>
          {user?.name?.charAt(0)}
        </StyledAvatar>
        <Typography variant="subtitle1" fontWeight="bold">
          {user?.name}
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              handleDrawerToggle();
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo variant="h5" onClick={() => navigate('/')}>
            CareerPath AI
          </Logo>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.path}
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                    active={location.pathname === item.path}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <NotificationBadge badgeContent={3} color="secondary">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </NotificationBadge>

                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>

                <StyledAvatar
                  src={user?.avatar}
                  alt={user?.name}
                  onClick={handleMenu}
                >
                  {user?.name?.charAt(0)}
                </StyledAvatar>
              </Box>
            </>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                },
              },
            }}
          >
            <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/settings'); handleClose(); }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar; 