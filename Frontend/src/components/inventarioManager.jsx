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
    borrarVehiculo
} from "../Services/inventarioS.js";

const articuloFormVacio = {
    nombre: "",
    cantidad: "",
    enUso: true
}

const vehiculoFormVacio = {
    marca: "",
    modelo: "",
    patente: "",
    disponible: true
}

export function inventarioManager(){
    const [articulos, setArticulos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticulos();
        fetchVehiculos();
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
        setFormData(formVacio);
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

    const abrirEditarVehiculo = (vehiculo) => {
        setEditandoId(vehiculo.id);
        setFormData({
            marca: vehiculo.marca,
            modelo: vehiculo.modelo,
            patente: vehiculo.patente,
            disponible: vehiculo.disponible
        });
        setErrorForm(null);
        setMostrarForm(true);
    }

    const cancelarForm = () => {
        setMostrarForm(false);
        setEditandoId(null);
        setFormData(formVacio);
        setErrorForm(null);
    };

    const handleSubmitArticulo = async (e) => {
        
    }

    return (
        <div>

        </div>
    );
}