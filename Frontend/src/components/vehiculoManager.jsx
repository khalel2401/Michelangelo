import { useEffect, useState } from "react";
import { 
    getVehiculos,
    crearVehiculo,
    actualizarVehiculo,
    borrarVehiculo
} from "../Services/vehiculoS.js";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { alpha } from "@mui/material/styles";

const vehiculoFormVacio ={
    marca: "", 
    modelo: "", 
    patente: "", 
    disponible: true 
};

const botonConBrillo = (color = "primary") => (theme) => ({
    boxShadow: `0 2px 8px ${alpha(theme.palette[color].main, 0.16)}`,
    transition: "box-shadow 180ms ease, transform 180ms ease",
    "&:hover:not(.Mui-disabled)": {
        boxShadow: `0 0 20px ${alpha(theme.palette[color].main, 0.55)}`,
        transform: "translateY(-4px)",
    },
});

export function vehiculoManager() {
    const [vehiculos, setVehiculos] = useState([]);
    const [cargando, setCargando] = useState(true);  
    const [error, setError] = useState(null);
      
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState(null);
    const [formData, setFormData] = useState(vehiculoFormVacio);
    const [guardando, setGuardando] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [eliminandoId, setEliminandoId] = useState(null);
    console.log("Renderizando vehiculoManager, estado actual:", {
        vehiculos,
        cargando,
        error,
        mostrarForm,
        editandoId,
        formData,
        guardando,
        errorForm,
        eliminandoId
    });

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const fetchVehiculos = async () => {
        setCargando(true);
        setError(null);
        try{
            const data = await getVehiculos();
            if(!data.success){
                throw new Error(data.message);
            }
            setVehiculos(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const abrirCrear = () => {
        setEditandoId(null);
        setFormData(vehiculoFormVacio);
        setErrorForm(null);
        setMostrarForm(true);
    };

    const abrirEditarVehiculo = (vehiculo) => {
        setEditandoId(vehiculo.id);
        setFormData({
            marca: vehiculo.marca, 
            modelo: vehiculo.modelo, 
            patente: vehiculo.patente, 
            disponible: vehiculo.disponible 
        });
        setErrorForm(null);
    };

    const cancelarForm = () => {
        setMostrarForm(false);
        setEditandoId(null);
        setFormData(vehiculoFormVacio);
        setErrorForm(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        setErrorForm(null);

        const vehiculoData = {
            ...formData,
            disponible: formData.disponible === "true" || formData.disponible === true,
        };
        
        try {
            const response = editandoId
                ? await actualizarVehiculo(editandoId, vehiculoData)
                : await crearVehiculo(vehiculoData);
                
            if (response.success) {
                if (editandoId) {
                    setVehiculos((prevVehiculos) =>
                        prevVehiculos.map((vehiculo) =>
                            vehiculo.id === editandoId ? response.data : vehiculo
                        )
                    );
                } else {
                    setVehiculos((prevVehiculos) => [...prevVehiculos, response.data]);
                }
                cancelarForm();
            } else {
                setErrorForm(response.message || "Error al guardar el vehículo");
            }
        } catch (err) {
            setErrorForm(err.message || "Error al guardar el vehículo");
        } finally {
            setGuardando(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este vehículo?");
        if (!confirmar) return;
        
        setEliminandoId(id);
        const response = await borrarVehiculo(id);
        if (response.success) {
            setVehiculos((prevVehiculos) => prevVehiculos.filter((vehiculo) => vehiculo.id !== id));
        } else {
            alert(response.message || "Error al eliminar el vehículo");
        }
        setEliminandoId(null);
    };

    const renderformulario = (esEdicion) => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" component="h6">
                {esEdicion ? "Editar Vehículo" : "Crear Vehículo"}
            </Typography>
            {errorForm && <Alert severity="error">{errorForm}</Alert>}
            <TextField
                label="Marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                required
                size="small"
            />
            <TextField
                label="Modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                required
                size="small"
            />
            <TextField
                label="Patente"
                name="patente"
                value={formData.patente}
                onChange={handleChange}
                required
                size="small"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.disponible}
                        onChange={handleChange}
                        name="disponible"
                    />
                }
                label="Disponible"
            />
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button type="submit" variant="contained" disabled={guardando} sx={botonConBrillo()}>
                    {guardando ? "Guardando..." : esEdicion ? "Actualizar" : "Crear"}
                </Button>
                <Button type="button" onClick={cancelarForm} disabled={guardando} sx={botonConBrillo("secondary")}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
            


    return (
        <Box sx={{ width: "100%", py: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
                Vehículos Disponibles
            </Typography>
            {error && <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>{error}</Alert>}
            {cargando && <Typography role="status" align="center">Cargando vehículos...</Typography>}

            {!cargando && !error && vehiculos.length === 0 && (
                <Typography align="center">No hay vehículos ingresados.</Typography>
            )}

            {!cargando && !error && vehiculos.length > 0 && (
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, overflowX: "auto" }}>
                    <Table aria-label="Vehiculos">
                        
                        <TableHead>
                            <TableRow>
                                <TableCell>Vehiculo</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {vehiculos.map((vehiculo) => {
                                const editandoVehiculo = editandoId === vehiculo.id;

                                if(editandoVehiculo){
                                    return (
                                        <TableRow key={vehiculo.id}>
                                            <TableCell colSpan={4}>
                                                {renderformulario(true)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                                return (
                                    <TableRow key={vehiculo.id} hover>
                                        <TableCell>{vehiculo.patente}</TableCell>
                                        <TableCell>{vehiculo.marca}</TableCell>
                                        <TableCell>{vehiculo.modelo}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={vehiculo.disponible ? "Disponible" : "No Disponible"}
                                                color={vehiculo.disponible ? "success" : "error"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button 
                                                size="small"
                                                variant="outlined" 
                                                onClick={() => abrirEditarVehiculo(vehiculo)} 
                                                sx={botonConBrillo()}
                                            >
                                                Editar
                                            </Button>
                                            <Button 
                                                size="small"
                                                variant="outlined" 
                                                color="error"
                                                onClick={() => handleDelete(vehiculo.id)} 
                                                disabled={eliminandoId === vehiculo.id}
                                                sx={botonConBrillo("error")}
                                            >
                                                {eliminandoId === vehiculo.id ? "Eliminando..." : "Eliminar"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
            )}

            {mostrarForm ? (
                <Paper variant="outlined" sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
                    {renderformulario(false)}
                </Paper>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <Button variant="contained" onClick={abrirCrear} sx={botonConBrillo()}>
                        Crear Nuevo Vehículo
                    </Button>
                </Box>
            )}
        </Box>
    );
};