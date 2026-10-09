import * as React from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import { useNavigate } from 'react-router-dom';

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

export default function MiniDrawer() {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const routes = {
    Locales: '/locales',
    Inventario: '/Inventario',
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          <IconButton
            color="inherit"
            aria-label={`Cambiar a modo ${mode === 'dark' ? 'claro' : 'oscuro'}`}
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          >
            <PregnantWomanIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton aria-label="Ir a inicio" onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
          {open && (
            <IconButton aria-label="Cerrar menú" onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {['Locales', 'Eventos', 'Inventario', 'Personal'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={routes[text] ? () => navigate(routes[text]) : undefined}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {text === 'Locales' ? <InboxIcon /> : <AccessibleIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  <AccessibleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}