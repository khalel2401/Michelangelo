import React, { useState } from "react";
import { API_URL } from '../api/config';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

export default function Login({ onLogin }) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const filledPasswordId = React.useId();
  const filledUserId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Usuario o contraseña incorrectos");
      }

      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      onLogin?.();
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      alert(err.message || "Usuario o contraseña incorrectos");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 3,
        boxSizing: "border-box",
      }}
    >
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          border: `1px solid ${theme.palette.brand.crimson}`,
          boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
          animation: "loginPop 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
          "@keyframes loginPop": {
            "0%": {
              opacity: 0,
              transform: "scale(0.92) translateY(12px)",
            },
            "70%": {
              opacity: 1,
              transform: "scale(1.02) translateY(0)",
            },
            "100%": {
              opacity: 1,
              transform: "scale(1)",
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
          },
          transition: "box-shadow 180ms ease",
          "&:hover": {
            boxShadow: `0 0 20px ${alpha(theme.palette.brand.crimson, 0.55)}`,
          },
        })}
      >
        <CardContent
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            "&:last-child": { pb: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Iniciar sesión
          </Typography>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor={`${filledUserId}-input`}>Email</InputLabel>
            <FilledInput
              id={`${filledUserId}-input`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor={`${filledPasswordId}-input`}>Password</InputLabel>
            <FilledInput
              id={`${filledPasswordId}-input`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {error && (
            <Typography color="error" role="alert">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={cargando}
            sx={(theme) => ({
              mt: 1,
              backgroundColor: theme.palette.brand.crimson,
              boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
              transition: "box-shadow 180ms ease, transform 180ms ease",
              "&:hover:not(.Mui-disabled)": {
                backgroundColor: theme.palette.brand.crimsonDark,
                boxShadow: `0 0 20px ${alpha(theme.palette.brand.crimson, 0.55)}`,
                transform: "translateY(-2px)",
              },
            })}
          >
            {cargando ? "Iniciando..." : "Iniciar sesión"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}