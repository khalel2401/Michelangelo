import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

import AddCardForm from "./agregarTarjeta.jsx";
import PaymentResult from "./resultadoPago.jsx";
import { pagarCotizacion } from "../Services/pagoS.js";
import { instance as axios } from "../Services/rootS.js";
import { haySesion } from "../Services/sesionS.js";

const botonConBrillo = (color = "primary") => (theme) => ({
  color: theme.palette[color].contrastText,
  backgroundColor: theme.palette[color].main,
  boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.28)}`,
  transition: "background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
  "&:hover:not(.Mui-disabled)": {
    backgroundColor: theme.palette[color].dark,
    boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.7)}`,
    transform: "translateY(-3px)",
  },
});

function PaymentModal({
  cotizacion,
  tarjetas = [],
  onAddCard,
  onPaid,
  onClose,
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [addingCard, setAddingCard] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [cards, setCards] = useState(tarjetas);

  useEffect(() => {
    setCards(tarjetas);
    setSelectedCard((actual) => {
      if (actual && tarjetas.some((tarjeta) => tarjeta.id === actual.id)) {
        return actual;
      }
      return tarjetas[0] ?? null;
    });
  }, [tarjetas]);

  useEffect(() => {
    setSelectedCard(null);
    setAddingCard(false);
    setProcessing(false);
    setResult(null);
    setError("");
  }, [cotizacion?.id]);

  if (!cotizacion) return null;

  const montoPago = cotizacion.abono ?? cotizacion.valorTotal ?? 0;

  const handleSaveCard = async (cardData) => {
    try {
      setError("");
      let savedCard;

      if (onAddCard) {
        savedCard = await onAddCard(cardData);
      } else {
        const response = await axios.post("/tarjetas", cardData);
        savedCard = response.data;
      }

      if (savedCard?.success === false) {
        throw new Error(savedCard.message);
      }

      const tarjeta = savedCard?.data ?? savedCard;
      setCards((actuales) => [...actuales, tarjeta]);
      setSelectedCard(tarjeta);
      setAddingCard(false);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || err.message || "No se pudo guardar la tarjeta");
    }
  };

  const handlePay = async () => {
    if (!selectedCard || processing) return;
    if (!haySesion()) {
      setError("Tu sesión expiró. Inicia sesión nuevamente.");
      return;
    }

    setProcessing(true);
    setError("");

    const montoEntero = Math.round(Number(montoPago));
    const response = await pagarCotizacion(
      cotizacion.id,
      selectedCard.id,
      montoEntero
    );

    setResult(response);
    if (response.success) {
      await onPaid?.(response.data);
    }

    setProcessing(false);
  };

  return (
    <Dialog open={Boolean(cotizacion)} onClose={processing ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirmar pago</DialogTitle>
      <DialogContent dividers>
        {result ? (
          <PaymentResult result={result} onClose={onClose} />
        ) : addingCard ? (
          <AddCardForm
            onSave={handleSaveCard}
            onCancel={() => {
              setAddingCard(false);
              setError("");
            }}
          />
        ) : (
          <Stack spacing={2}>
            <Typography color="text.secondary">
              Revisa los detalles antes de continuar.
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Stack spacing={1}>
              <Typography>
                <strong>Cotización:</strong> #{cotizacion.id}
              </Typography>
              <Typography>
                <strong>Valor total:</strong> ${Number(cotizacion.valorTotal).toLocaleString("es-CL")}
              </Typography>
              <Typography variant="h6" color="SkyBlue">
                <strong>Monto a pagar:</strong> ${Number(montoPago).toLocaleString("es-CL")}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Tarjeta de pago</Typography>
              <Button
                size="small"
                variant="contained"
                onClick={() => setAddingCard(true)}
                sx={botonConBrillo()}
              >
                Agregar
              </Button>
            </Stack>

            {cards.length === 0 ? (
              <Alert severity="info">Agrega una tarjeta para realizar el pago.</Alert>
            ) : (
              <Stack spacing={1}>
                {cards.map((tarjeta) => (
                  <Card
                    key={tarjeta.id}
                    variant={selectedCard?.id === tarjeta.id ? "elevation" : "outlined"}
                    sx={{
                      border: selectedCard?.id === tarjeta.id ? 2 : 1,
                      borderColor: selectedCard?.id === tarjeta.id ? "primary.main" : "divider",
                      backgroundColor: selectedCard?.id === tarjeta.id ? "action.selected" : "background.paper",
                      boxShadow: selectedCard?.id === tarjeta.id
                        ? (theme) => `0 0 18px ${alpha(theme.palette.primary.main, 0.35)}`
                        : 1,
                      transition: "box-shadow 180ms ease, transform 180ms ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: (theme) => `0 0 16px ${alpha(theme.palette.primary.main, 0.28)}`,
                      },
                    }}
                  >
                    <CardActionArea onClick={() => setSelectedCard(tarjeta)}>
                      <CardContent>
                        <Typography fontWeight="bold">{tarjeta.titular}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {tarjeta.tipo} · •••• {tarjeta.numero?.slice(-4)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </DialogContent>

      {!result && !addingCard && (
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={onClose}
            disabled={processing}
            variant="contained"
            color="inherit"
            sx={(theme) => ({
              backgroundColor: theme.palette.action.selected,
              boxShadow: `0 2px 8px ${alpha(theme.palette.text.primary, 0.12)}`,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                transform: "translateY(-2px)",
              },
            })}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handlePay}
            disabled={!selectedCard || processing}
            startIcon={processing ? <CircularProgress size={18} /> : null}
            sx={botonConBrillo()}
          >
            {processing ? "Procesando..." : `Pagar $${Number(montoPago).toLocaleString("es-CL")}`}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default PaymentModal;