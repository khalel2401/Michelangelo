import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { cotizacionManager } from "../components/cotizacionManager.jsx";
import Button from "@mui/material/Button";

const tabla = [
    {
        id: "cotizacion",
        label: "administracion cotizaciones",
        component: cotizacionManager
    },
];

export default function Cotizaciones() {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(tabla[0].id);
    const TabComponent = tabla.find((t) => t.id === tabActiva)?.component;

    return (
        <div className="right" id="right">
            <div className="Cotizaciones">
                <div className="tabs-nav">
                </div>
                <div className="tab-content">
                    {TabComponent && <TabComponent/>}
                </div>
                <Button variant="contained" onClick={() => navigate('/')}>Volver al menu</Button>
            </div>
        </div>
    );
}