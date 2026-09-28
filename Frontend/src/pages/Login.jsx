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

export default function Login({ onLogin }) {
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = useState(null);

  

  const filledPasswordId = React.useId();
  const filledUserId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = email === "admin@correo.com";
    const passwordValida = password === "123456";

    if (emailValido && passwordValida) {
      onLogin();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor={`${filledUserId}-input`}>Email</InputLabel>
        <FilledInput
          id={`${filledUserId}-input`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
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

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Iniciar sesión
      </Button>
    </form>
  );
}