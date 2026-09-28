import * as React from 'react';
import Container from '@mui/material/Container';
import ProTip from './components/ProTip';
import Box from '@mui/material/Box';
import Login from './pages/Login';
import Home from './pages/home';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  if (isLoggedIn) {
    return <Home />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Login onLogin={() => setIsLoggedIn(true)} />
      </Box>
      <ProTip />
    </Container>
  );
}