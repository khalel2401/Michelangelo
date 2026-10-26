import * as React from 'react';
import { flushSync } from 'react-dom';
import { alpha, styled, useColorScheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';


//iconos
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
//




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.brand.onAppBar,
  backgroundColor: theme.palette.brand.appBar,
  backgroundImage: [
    `linear-gradient(180deg, ${alpha(theme.palette.brand.appBar, 0.025)} 0%, ${alpha(theme.palette.brand.burgundy, 0.08)} 100%)`,
    `linear-gradient(105deg, ${theme.palette.brand.burgundy} 0%, ${theme.palette.brand.crimsonDark} 24%, ${theme.palette.brand.crimson} 50%, ${theme.palette.brand.crimsonDark} 76%, ${theme.palette.brand.burgundy} 100%)`,
  ].join(', '),
  borderBottom: `1px solid ${alpha(theme.palette.brand.burgundy, 0.2)}`,
  boxShadow: `0 2px 8px ${alpha(theme.palette.brand.burgundy, 0.12)}`,
  animation: 'appBarPop 500ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
  '@keyframes appBarPop': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.96) translateY(-10px)',
    },
    '70%': {
      opacity: 1,
      transform: 'scale(1.01) translateY(0)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '@keyframes drawerSlideIn': {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' },
    },
    '& .MuiDrawer-paper': {
      animation: 'drawerSlideIn 450ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer({ onLogout }) {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const navigationItems = [
    { text: 'Inicio', route: '/', icon: <HomeIcon /> },
    { text: 'Locales', route: '/locales', icon: <InboxIcon /> },
    { text: 'Eventos', route: '/eventos', icon: <EventIcon /> },
    { text: 'Inventario', route: '/Inventario', icon: <InventoryIcon /> },
    { text: 'Personal', route: '/personal', icon: <PersonIcon /> },
    { text: 'Cotizaciones', route: '/cotizaciones', icon: <PointOfSaleIcon /> },
  ];
  const tooltipSlotProps = {
    tooltip: {
      sx: {
        fontSize: '0.9rem',
        px: 1.5,
        py: 0.75,
      },
    },
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeToggle = (event) => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setMode(nextMode);
      return;
    }

    const x = event.detail === 0 ? window.innerWidth / 2 : event.clientX;
    const y = event.detail === 0 ? window.innerHeight / 2 : event.clientY;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const root = document.documentElement;

    root.style.setProperty('--theme-transition-x', `${x}px`);
    root.style.setProperty('--theme-transition-y', `${y}px`);
    root.style.setProperty('--theme-transition-radius', `${radius}px`);

    document.startViewTransition(() => {
      flushSync(() => setMode(nextMode));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    navigate('/', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            NES eventos
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Cerrar sesión" slotProps={tooltipSlotProps}>
            <span>
              <IconButton
                color="inherit"
                aria-label="Cerrar sesión"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        
        <DrawerHeader>
          {open && (
            <IconButton aria-label="Cerrar menú" onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </DrawerHeader>
        
        <Divider />
        
        <List sx={{ flexGrow: 1 }}>
          {navigationItems.map(({ text, route, icon }) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={text} placement="right" slotProps={tooltipSlotProps}>
                <ListItemButton
                  onClick={() => navigate(route)}
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: 'center' },
                      open ? { mr: 3 } : { mr: 'auto' },
                    ]}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip
              title={`Cambiar a modo ${mode === 'dark' ? 'claro' : 'oscuro'}`}
              placement="right"
              slotProps={tooltipSlotProps}
            >
              <ListItemButton
                onClick={handleThemeToggle}
                disabled={!mode}
                aria-label={`Cambiar a modo ${mode === 'dark' ? 'claro' : 'oscuro'}`}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={`Cambiar a modo ${mode === 'dark' ? 'claro' : 'oscuro'}`}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}