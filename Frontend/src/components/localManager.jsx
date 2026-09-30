import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getLocales, crearLocal, actualizarLocal, borrarLocal } from "../Services/localS.js";

const formVacio = {
    nombre: "",
    precio: "",
    contacto: "",
    nombreDueno: "",
    aforo: "",
    direccion: "",
    disponibilidad: true
}

export function localManager(){
  const [locales, setLocales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // null = creando, id = editando
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    fetchLocales();
  }, []);
  
  const fetchLocales = async () => {
    setCargando(true);
    setError(null);

    try {
        const data = await getLocales();
        if (!data.success) {
          throw new Error(data.message);
        }
        setLocales(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
        setError(err.message);
    } finally {
        setCargando(false);
    }
  };

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

 const abrirEditar = (local) => {
    setEditandoId(local.id);
    setFormData({
    nombre: local.nombre,
    precio: local.precio,
    contacto: local.contacto,
    nombreDueno: local.nombreDueno,
    aforo: local.aforo,
    direccion: local.direccion,
    disponibilidad: local.disponibilidad,
    });
    setErrorForm(null);
    setMostrarForm(true);
  };

 const cancelarForm = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setFormData(formVacio);
    setErrorForm(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setErrorForm(null);

    const datosLocal = {
      ...formData,
      precio: Number(formData.precio),
      aforo: Number(formData.aforo),
    };

    try {
      const res = editandoId
        ? await actualizarLocal(editandoId, datosLocal)
        : await crearLocal(datosLocal);

      if (res.success) {
        if (editandoId) {
          setLocales((actuales) => actuales.map((local) => (local.id === editandoId ? res.data : local)));
        } else {
          setLocales((actuales) => [...actuales, res.data]);
        }
        cancelarForm();
      } else {
        setErrorForm(res.message);
      }
    } catch (err) {
      setErrorForm(err.message || "No se pudo guardar el local");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este local?");
    if (!confirmar) return;

    setEliminandoId(id);
    const res = await borrarLocal(id);

    if (res.success) {
      setLocales(locales.filter((v) => v.id !== id));
    } else {
      alert(res.message);
    }

    setEliminandoId(null);
  };

  return (
    <div>
        <h2>Locales</h2>
        {cargando && <p>Cargando locales...</p>}
        {error && <p>Error: {error}</p>}

        {!cargando && !error &&(
            <Box component="ul" sx={{ listStyle: "none", p: 0, display: "grid", gap: 2 }}>
                {locales.length === 0 ? (
                  <Paper component="li" variant="outlined" sx={{ p: 2 }}>
                    No existen locales.
                  </Paper>
                ): (
                  locales.map((local) => (
                    <Paper component="li" key={local.id} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1.5 }}>
                        <Typography><strong>Nombre:</strong> {local.nombre}</Typography>
                        <Typography><strong>Precio:</strong> {local.precio}</Typography>
                        <Typography><strong>Contacto:</strong> {local.contacto}</Typography>
                        <Typography><strong>Dueño:</strong> {local.nombreDueno}</Typography>
                        <Typography><strong>Aforo:</strong> {local.aforo}</Typography>
                        <Typography><strong>Dirección:</strong> {local.direccion}</Typography>
                        <Typography><strong>Disponibilidad:</strong> {local.disponibilidad ? "Disponible" : "No disponible"}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                        <Button size="small" variant="outlined" onClick={() => abrirEditar(local)}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleEliminar(local.id)}
                          disabled={eliminandoId === local.id}
                        >
                          {eliminandoId === local.id ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </Box>
                    </Paper>
                  ))
                )}
            </Box>
        )}
        {!mostrarForm && (
        <Button variant="contained" onClick={abrirCrear}>Agregar nuevo local</Button>
      )}
      {mostrarForm && (
        <form onSubmit={handleSubmit} className="local-form" style={{ display: "grid", gap: "12px", maxWidth: "420px" }}>
          <h3>{editandoId ? "Editar local" : "Nuevo local"}</h3>
          {errorForm && <p className="error-msg">{errorForm}</p>}

          <label style={{ display: "grid", gap: "4px" }}>
            Nombre
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>

          <label style={{ display: "grid", gap: "4px" }}>
            Precio
            <input type="number" min="0" step="any" name="precio" value={formData.precio} onChange={handleChange} required />
          </label>

          <label style={{ display: "grid", gap: "4px" }}>
            Numero de contacto
            <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} minLength="8" maxLength="12" required />
          </label>
            
            <label style={{ display: "grid", gap: "4px" }}>
            Dueño del local
            <input type="text" name="nombreDueno" value={formData.nombreDueno} onChange={handleChange} required />
          </label>

            <label style={{ display: "grid", gap: "4px" }}>
              Aforo
              <input type="number" min="0" step="1" name="aforo" value={formData.aforo} onChange={handleChange} required />
            </label>

            <label style={{ display: "grid", gap: "4px" }}>
            Direccion
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" name="disponibilidad" checked={formData.disponibilidad} onChange={handleChange} />
            Disponible
          </label>

          <button type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={cancelarForm} disabled={guardando}>Cancelar</button>
        </form>
      )}
    </div>
  );
}