import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

// Styled components for animations
const AnimatedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    backgroundColor: theme.palette.primary.main,
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '100%',
  },
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const AnimatedTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: -2,
    left: 0,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Profile', path: '/profile' },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        bgcolor: 'background.paper',
        height: '100%',
        pt: 2,
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <Grow in={true} timeout={500} key={item.text} style={{ transitionDelay: `${index * 100}ms` }}>
            <ListItem
              button
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(10px)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          </Grow>
        ))}
      </List>
    </Box>
  );

  return (
    <Fade in={true} timeout={1000}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <AnimatedTypography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 'bold',
            }}
          >
            Career Path Advisor
          </AnimatedTypography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <AnimatedButton
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color="primary"
                  sx={{
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  {item.text}
                </AnimatedButton>
              ))}
            </Box>
          )}
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
      </AppBar>
    </Fade>
  );
};

export default Header; 