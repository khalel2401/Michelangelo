import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import {
    getArticulos,
    actualizarArticulos,
    borrarArticulos,
    crearArticulos
} from "../Services/inventarioS.js";

const articuloFormVacio = {
    nombre: "",
    cantidad: "",
    enUso: true
};

const botonConBrillo = (color = "primary") => (theme) => ({
    boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
    transition: "box-shadow 180ms ease, transform 180ms ease",
    "&:hover:not(.Mui-disabled)": {
        boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
        transform: "translateY(-4px)",
    },
});

export function inventarioManager(){
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState(articuloFormVacio);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [eliminandoId, setEliminandoId] = useState(null);

    useEffect(() => {
        fetchArticulos();
    }, []);

    const fetchArticulos = async () => {
        setCargando(true);
        setError(null);
        try{
            const data = await getArticulos();
            if(!data.success){
                throw new Error(data.message);
            }
            setArticulos(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }

    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
            setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const abrirCrear = () => {
        setEditandoId(null);
        setFormData(articuloFormVacio);
        setErrorForm(null);
        setMostrarForm(true);
    };

    const abrirEditarArticulo = (articulo) => {
        setEditandoId(articulo.id);
        setFormData({
            nombre: articulo.nombre,
            cantidad: articulo.cantidad,
            enUso: articulo.enUso
        });
        setErrorForm(null);
    };

    const cancelarForm = () => {
        setMostrarForm(false);
        setEditandoId(null);
        setFormData(articuloFormVacio);
        setErrorForm(null);
    };

    const handleSubmitArticulo = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrorForm(null);

        const datosArticulo = {
            ...formData,
            cantidad: Number(formData.cantidad),
        };

        try {
            const res = editandoId 
            ? await actualizarArticulos(editandoId, datosArticulo) 
            : await crearArticulos(datosArticulo);

            if (res.success) {
                if (editandoId){
                    setArticulos((actuales) => actuales.map((articulo) => (articulo.id === editandoId ? res.data : articulo)));
                } else {
                    setArticulos((actuales) => [...actuales, res.data]);
                }
                cancelarForm();
            } else {
                setErrorForm(res.message);
            }
        } catch (err) {
            setErrorForm(err.message || "no se pudo guardar el articulo");
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Seguro que quieres eliminar el articulo?");
        if (!confirmar) return;

        setEliminandoId(id);
        const res = await borrarArticulos(id);

        if (res.success) {
            setArticulos(articulos.filter((v) => v.id !== id));
        } else {
            alert(res.message);
        }

        setEliminandoId(null);
    };

    const renderFormulario = (esEdicion) => (
        <Box component="form" onSubmit={handleSubmitArticulo} sx={{ display: "grid", gap: 1.5 }}>
            <Typography variant="h6" component="h3">
                {esEdicion ? "Editar artículo" : "Nuevo artículo"}
            </Typography>
            {errorForm && <Alert severity="error">{errorForm}</Alert>}
            <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                size="small"
            />
            <TextField
                label="Cantidad"
                name="cantidad"
                type="number"
                inputProps={{ min: 0, step: "any" }}
                value={formData.cantidad}
                onChange={handleChange}
                required
                size="small"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="enUso"
                        checked={formData.enUso}
                        onChange={handleChange}
                    />
                }
                label="En uso"
            />
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button type="submit" variant="contained" disabled={guardando} sx={botonConBrillo()}>
                    {guardando ? "Guardando..." : "Guardar"}
                </Button>
                <Button type="button" onClick={cancelarForm} disabled={guardando} sx={botonConBrillo()}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ width: "100%", py: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
                Inventario
            </Typography>
            {cargando && <Typography role="status" align="center">Cargando artículos...</Typography>}
            {error && <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>{error}</Alert>}

            {!cargando && !error && articulos.length === 0 && (
                <Typography align="center" sx={{ mb: 2 }}>No hay artículos ingresados.</Typography>
            )}

            {!cargando && !error && articulos.length > 0 && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 220px))",
                        justifyContent: "center",
                        alignItems: "stretch",
                        gap: 3,
                        mb: 3,
                    }}
                >
                    {articulos.map((articulo) => {
                        const editandoEsteArticulo = editandoId === articulo.id;

                        return (
                            <Card
                                key={articulo.id}
                                variant="outlined"
                                sx={(theme) => ({
                                    width: "100%",
                                    aspectRatio: editandoEsteArticulo ? "auto" : "1 / 1",
                                    minHeight: editandoEsteArticulo ? 0 : 220,
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    border: `1px solid ${theme.palette.brand.crimson}`,
                                    boxShadow: `0 2px 8px ${alpha(theme.palette.brand.crimson, 0.16)}`,
                                    animation: "articuloFadeIn 450ms ease-out both",
                                    "@keyframes articuloFadeIn": {
                                        from: { opacity: 0 },
                                        to: { opacity: 1 },
                                    },
                                    "@media (prefers-reduced-motion: reduce)": {
                                        animation: "none",
                                    },
                                    transition: "box-shadow 180ms ease, transform 180ms ease",
                                    "&:hover": {
                                        boxShadow: `0 0 20px ${alpha(theme.palette.brand.crimson, 0.55)}`,
                                        transform: "translateY(-4px)",
                                    },
                                })}
                            >
                                <CardContent sx={{ p: 2.5, display: "flex", flex: 1, flexDirection: "column" }}>
                                    {editandoEsteArticulo ? (
                                        renderFormulario(true)
                                    ) : (
                                        <>
                                            <Typography variant="h5" component="h3" gutterBottom>
                                                {articulo.nombre}
                                            </Typography>
                                            <Chip
                                                label={articulo.enUso ? "En uso" : "No está en uso"}
                                                color={articulo.enUso ? "success" : "default"}
                                                size="small"
                                                sx={{ alignSelf: "flex-start", mb: 2 }}
                                            />
                                            <Box sx={{ display: "grid", gap: 1, flex: 1 }}>
                                                <Typography><strong>Cantidad:</strong> {articulo.cantidad}</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 1, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                                                <Button size="small" variant="outlined" onClick={() => abrirEditarArticulo(articulo)} sx={botonConBrillo()}>
                                                    Editar
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => handleEliminar(articulo.id)}
                                                    disabled={eliminandoId === articulo.id}
                                                    sx={botonConBrillo("error")}
                                                >
                                                    {eliminandoId === articulo.id ? "Eliminando..." : "Eliminar"}
                                                </Button>
                                            </Box>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            )}

            {mostrarForm ? (
                <Paper variant="outlined" sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 3 }}>
                    {renderFormulario(false)}
                </Paper>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={abrirCrear} sx={botonConBrillo()}>
                        Agregar artículo
                    </Button>
                </Box>
            )}
        </Box>
    );
}