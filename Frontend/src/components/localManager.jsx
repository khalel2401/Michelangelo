import { useEffect, useState } from "react";
import { getLocales, crearLocal, actualizarLocal, borrarLocal } from "../Services/localS.js";

const formVacio = {
    nombre: "",
    precio: "",
    contacto: "",
    nombreDueno: "",
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
        setLocales(data.data);
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


    const res = editandoId
      ? await actualizarLocal(editandoId, datosLocal)
      : await crearLocal(datosLocal);

    if (res.success) {
      if (editandoId) {
        setLocales(locales.map((v) => (v.id === editandoId ? res.data : v)));
      } else {
        setLocales([...locales, res.data]);
      }
      cancelarForm();
    } else {
      setErrorForm(res.message);
    }

    setGuardando(false);
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
            <ul>
                {locales.length === 0 ? (
                    <p>No existen locales.</p>
                ): (
                    locales.map((local) => {
                        <li key={local.id}>
                            {local.nombre} {local.precio} {local.contacto} {local.nombreDueno} {local.aforo} {local.direccion}
                            {local.disponibilidad ? "Disponible" : "No disponible"}
                            <button onClick={() => abrirEditar(local)}>Editar</button>
                            <button
                                onClick={() => handleEliminar(local.id)}
                                disabled={eliminandoId === local.id}
                            >
                                {eliminandoId === local.id ? "Eliminando..." : "Eliminar"}
                            </button>
                        </li>
                    })
                )}
            </ul>
        )}
        {!mostrarForm && (
        <button onClick={abrirCrear}>Agregar nuevo local</button>
      )}
      {mostrarForm && (
        <form onSubmit={handleSubmit} className="local-form">
          <h3>{editandoId ? "Editar local" : "Nuevo local"}</h3>
          {errorForm && <p className="error-msg">{errorForm}</p>}

          <label>
            Nombre
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>

          <label>
            Precio
            <input type="text" name="precio" value={formData.precio} onChange={handleChange} required />
          </label>

          <label>
            Numero de contacto
            <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} required />
          </label>
            
            <label>
            Dueño del local
            <input type="text" name="nombreDueno" value={formData.nombreDueno} onChange={handleChange} required />
          </label>

            <label>
            Direccion
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
          </label>

            <label>
            <input type="checkbox" name="disponibilidad" checked={formData.disponibilidad} onChange={handleChange} />
            Disponible
          </label>

        </form>
      )}
    </div>
  );
}