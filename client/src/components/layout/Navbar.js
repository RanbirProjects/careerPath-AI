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
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
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
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/profile', label: 'Profile', icon: ProfileIcon },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
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
            <ListItemIcon>{<item.icon />}</ListItemIcon>
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
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}
        >
          CareerPath AI
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              {navItems.map((item) => (
                <NavButton
                  key={item.path}
                  startIcon={<item.icon />}
                  onClick={() => navigate(item.path)}
                  active={location.pathname === item.path}
                >
                  {item.label}
                </NavButton>
              ))}
              <IconButton
                size="large"
                onClick={handleMenu}
                sx={{ ml: 2 }}
              >
                <Avatar
                  alt={user?.name || 'User'}
                  src={user?.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <NavButton
                onClick={() => navigate('/login')}
                active={location.pathname === '/login'}
              >
                Login
              </NavButton>
              <NavButton
                onClick={() => navigate('/register')}
                active={location.pathname === '/register'}
                variant="contained"
                color="primary"
              >
                Register
              </NavButton>
            </>
          )}
        </Box>
      </Toolbar>

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