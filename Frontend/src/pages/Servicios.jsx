import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { servicioManager } from "../components/servicioManager.jsx";
import Button from "@mui/material/Button";

const tabla = [
    {
        id: "servicio",
        label: "administracion servicios",
        component: servicioManager
    },
];

export default function Servicios() {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(tabla[0].id);
    const TabComponent = tabla.find((t) => t.id === tabActiva)?.component;

    return (
        <div className="right" id="right">
            <div className="Servicios">
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