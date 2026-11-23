import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

function PaymentResult({ result, onClose }) {
  const success = result?.success === true;
  const pago = result?.data;

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 480,
        mx: "auto",
        p: 3,
        textAlign: "center",
        borderTop: 6,
        borderColor: success ? "success.main" : "error.main",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" component="h2" color={success ? "success.main" : "error.main"}>
          {success ? "Pago exitoso" : "Pago rechazado"}
        </Typography>

        <Alert severity={success ? "success" : "error"} sx={{ textAlign: "left" }}>
          {result?.message ||
            (success
              ? "Tu pago ha sido registrado."
              : "No se pudo completar el pago.")}
        </Alert>

        {success && pago && (
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: "action.hover",
              p: 2,
              textAlign: "left",
            }}
          >
            <Stack divider={<Divider />} spacing={1}>
              <Typography>
                <strong>Cotización:</strong> #{pago.cotizacion?.id}
              </Typography>
              <Typography>
                <strong>Monto:</strong>{" "}
                ${pago.monto?.toLocaleString("es-CL")}
              </Typography>
              <Typography>
                <strong>Estado:</strong> {pago.cotizacion?.estado}
              </Typography>
              <Typography>
                <strong>Tarjeta:</strong> {pago.tarjeta?.titular} · {pago.tarjeta?.tipo}
              </Typography>
              <Typography>
                <strong>Pago:</strong> #{pago.id}
              </Typography>
            </Stack>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={onClose}
          fullWidth
          sx={(theme) => ({
            color: theme.palette[success ? "success" : "primary"].contrastText,
            backgroundColor: theme.palette[success ? "success" : "primary"].main,
            boxShadow: `0 2px 8px ${alpha(theme.palette[success ? "success" : "primary"].main, 0.28)}`,
            "&:hover": {
              backgroundColor: theme.palette[success ? "success" : "primary"].dark,
              boxShadow: `0 0 20px ${alpha(theme.palette[success ? "success" : "primary"].main, 0.7)}`,
              transform: "translateY(-3px)",
            },
          })}
        >
          Cerrar
        </Button>
      </Stack>
    </Paper>
  );
}

export default PaymentResult;