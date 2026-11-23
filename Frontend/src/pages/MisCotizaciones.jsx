import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import PaymentModal from "../components/modeloPago.jsx";
import { getCotizaciones } from "../Services/cotizacionS.js";
import { instance as axios } from "../Services/rootS.js";
import { obtenerUsuario } from "../Services/sesionS.js";

const botonConBrillo = (theme) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.28)}`,
  transition: "box-shadow 180ms ease, transform 180ms ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.7)}`,
    transform: "translateY(-3px)",
  },
});

export default function MisCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarDatos = async () => {
    setCargando(true);
    setError("");

    try {
      const cotizacionesResponse = await getCotizaciones();
      if (!cotizacionesResponse.success) {
        throw new Error(cotizacionesResponse.message);
      }

      setCotizaciones(
        Array.isArray(cotizacionesResponse.data) ? cotizacionesResponse.data : []
      );

      const usuario = obtenerUsuario();
      if (usuario?.id) {
        const tarjetasResponse = await axios.get(`/tarjetas/${usuario.id}`);
        setTarjetas(
          Array.isArray(tarjetasResponse.data) ? tarjetasResponse.data : []
        );
      } else {
        setTarjetas([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "No se pudieron cargar las cotizaciones");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handlePaid = (pago) => {
    setCotizaciones((actuales) =>
      actuales.map((cotizacion) =>
        cotizacion.id === pago.cotizacion?.id
          ? { ...cotizacion, estado: pago.cotizacion.estado }
          : cotizacion
      )
    );
  };

  const handleAddCard = async (cardData) => {
    const response = await axios.post("/tarjetas", cardData);
    return response.data;
  };

  if (cargando) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Mis cotizaciones
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {cotizaciones.length === 0 ? (
        <Alert severity="info">No hay cotizaciones disponibles.</Alert>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {cotizaciones.map((cotizacion) => {
            const pagada = cotizacion.estado !== "pendiente";

            return (
              <Card key={cotizacion.id} variant="outlined">
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">Cotización #{cotizacion.id}</Typography>
                      <Chip
                        label={cotizacion.estado || "pendiente"}
                        color={pagada ? "success" : "warning"}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </Stack>

                    <Typography>
                      <strong>Personas:</strong> {cotizacion.cantidadPersonas}
                    </Typography>
                    <Typography>
                      <strong>Valor total:</strong>{" "}
                      ${Number(cotizacion.valorTotal).toLocaleString("es-CL")}
                    </Typography>
                    <Typography>
                      <strong>Abono:</strong>{" "}
                      ${Number(cotizacion.abono).toLocaleString("es-CL")}
                    </Typography>

                    {!pagada && (
                      <Button
                        variant="contained"
                        onClick={() => setCotizacionSeleccionada(cotizacion)}
                        sx={botonConBrillo}
                      >
                        Pagar
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      <PaymentModal
        cotizacion={cotizacionSeleccionada}
        tarjetas={tarjetas}
        onAddCard={handleAddCard}
        onPaid={handlePaid}
        onClose={() => setCotizacionSeleccionada(null)}
      />
    </Box>
  );
}
