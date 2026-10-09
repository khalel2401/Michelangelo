import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { 
    getArticulos,
    obtenerArticuloPorId,
    actualizarArticulos,
    borrarArticulos,
    getVehiculos,
    obtenerVehiculoPorId,
    actualizarVehiculo,
    borrarVehiculo,
    crearArticulos
} from "../Services/inventarioS.js";
import FormLabel from "@mui/material/FormLabel";

const articuloFormVacio = {
    nombre: "",
    cantidad: "",
    enUso: true
}

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
        setMostrarForm(true);
    }

    const cancelarForm = () => {
        setMostrarForm(false);
        setEditandoId(null);
        setFormData(ArticuloFormVacio);
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

    return (
        <Box sx={{ marginBottom: "20px" }}>
            {cargando && <Typography> Cargando Articulos </Typography>}
            {error && <Typography>Error: {error}</Typography>}


            {!cargando && !error &&(
                <Box component="ul" sx={{ listStyle: "none", p: 0, display: "grid", gap: 2, marginBottom: "20px" }}>
                    {articulos.length === 0 ? (
                        <Paper component="li" key={articulo.id} variant="outlined" sx={{ p:2 }}>
                            No hay articulos ingresados.
                        </Paper>
                    ): (
                        articulos.map((articulo) => (
                            <Paper component="li" key={articulo.id} variant="outlined" sx={{ p: 2 }}>
                                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1.5 }}>
                                    <Typography><strong>Nombre: </strong> {articulo.nombre}</Typography>
                                    <Typography><strong>Cantidad: </strong> {articulo.cantidad}</Typography>
                                    <Typography><strong>enUso: </strong> {articulo.enUso ? "En uso" : "No está en uso"}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                                    <Button size="small" variant="outlined" onClick={() => abrirEditarArticulo}>
                                        editar
                                    </Button>
                                    <Button size="small" color="error" variant="outlined" onClick={() => handleEliminar(articulo.id)} disabled={eliminandoId === articulo.id}>
                                        {eliminandoId === articulo.id ? "eliminando...." : "eliminar"}
                                    </Button>
                                </Box>
                            </Paper>
                        ))
                    )}
                </Box>
            )}
            {!mostrarForm && (
                <Button variant="contained" onClick={abrirCrear}>Agregar Articulo</Button>
            )}
            {mostrarForm && (
                <form onSubmit={handleSubmitArticulo} className="articulo-form" style={{ display: "grid", gap: "12px", maxWidth: "420px", marginBottom: "12px" }}>
                    <h3>{editandoId ? "editar articulo" : "nuevo articulo"}</h3>
                    {errorForm && <Typography className="error-msg">{errorForm}</Typography>}

                    <FormLabel style={{ display: "grid", gap: "4px"}}>
                        Nombre
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </FormLabel>

                    <FormLabel style={{ display: "grid", gap: "4px"}}>
                        Cantidad
                        <input type="number" min="0" step="any" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
                    </FormLabel>

                    <FormLabel style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="checkbox" name="enUso" checked={formData.enUso} onChange={handleChange} required />
                        en uso actualmente?
                    </FormLabel>

                    <Button type="submit" disabled={guardando}>
                        {guardando ? "guardando..." : "guardar"}
                    </Button>
                    <Button type="button" onClick={cancelarForm} disabled={guardando}>
                        cancelar
                    </Button>
                </form>
            )}
            <Typography>

            </Typography>
        </Box>
    );
}