import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { obtenerUsuario } from "../Services/sesionS.js";

const formInicial = {
  numero: "",
  cvv: "",
  fechaVencimiento: "",
  titular: "",
  tipo: "debito",
};

const tiposTarjeta = [
  { value: "debito", label: "Débito" },
  { value: "credito", label: "Crédito" },
];

const botonConBrillo = (color = "primary") => (theme) => ({
  color: theme.palette[color].contrastText,
  backgroundColor: theme.palette[color].main,
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.28)}`,
  transition: "box-shadow 180ms ease, transform 180ms ease",
  "&:hover:not(.Mui-disabled)": {
    backgroundColor: theme.palette[color].dark,
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.7)}`,
    transform: "translateY(-3px)",
  },
});

function AddCardForm({ onSave, onCancel }) {
  const [form, setForm] = useState(formInicial);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((actual) => ({ ...actual, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!/^\d{16}$/.test(form.numero)) {
      setError("El número debe contener exactamente 16 dígitos.");
      return;
    }

    if (!/^\d{3}$/.test(form.cvv)) {
      setError("El CVV debe contener exactamente 3 dígitos.");
      return;
    }

    if (!/^\d{4}-\d{2}$/.test(form.fechaVencimiento)) {
      setError("Selecciona una fecha de vencimiento válida.");
      return;
    }

    if (!form.titular.trim()) {
      setError("Ingresa el nombre del titular.");
      return;
    }

    const usuario = obtenerUsuario();
    if (!usuario?.id) {
      setError("No se pudo identificar al usuario autenticado.");
      return;
    }

    const [anio, mes] = form.fechaVencimiento.split("-");

    setGuardando(true);
    try {
      await onSave({
        usuarioId: Number(usuario.id),
        numero: form.numero,
        cvv: form.cvv,
        fechaVencimiento: `${mes}/${anio.slice(-2)}`,
        titular: form.titular.trim(),
        tipo: form.tipo,
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} variant="outlined" sx={{ p: 3, maxWidth: 520, mx: "auto" }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Agregar tarjeta
      </Typography>

      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Nombre del titular"
          name="titular"
          value={form.titular}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Número de tarjeta"
          name="numero"
          value={form.numero}
          onChange={handleChange}
          fullWidth
          required
          slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 16 } }}
        />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField
            label="CVV"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            fullWidth
            required
            slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 3 } }}
          />

          <TextField
            label="Fecha de vencimiento"
            name="fechaVencimiento"
            type="month"
            value={form.fechaVencimiento}
            onChange={handleChange}
            fullWidth
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>

        <FormControl fullWidth>
          <InputLabel id="tipo-tarjeta-label">Tipo de tarjeta</InputLabel>
          <Select
            labelId="tipo-tarjeta-label"
            id="tipo"
            name="tipo"
            value={form.tipo}
            label="Tipo de tarjeta"
            onChange={handleChange}
          >
            {tiposTarjeta.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button
            type="button"
            variant="contained"
            color="inherit"
            onClick={onCancel}
            disabled={guardando}
            sx={(theme) => ({
              backgroundColor: theme.palette.action.selected,
              boxShadow: `0 2px 8px ${alpha(theme.palette.text.primary, 0.12)}`,
              "&:hover": { backgroundColor: theme.palette.action.hover },
            })}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={guardando} sx={botonConBrillo()}>
            {guardando ? "Guardando..." : "Guardar tarjeta"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default AddCardForm;