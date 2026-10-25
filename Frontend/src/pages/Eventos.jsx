import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { eventoManager } from "../components/eventoManager.jsx";
import Button from "@mui/material/Button";

const tabla = [
    {
        id: "evento",
        label: "administracion eventos",
        component: eventoManager
    },
];

export default function Eventos() {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(tabla[0].id);
    const TabComponent = tabla.find((t) => t.id === tabActiva)?.component;

    return (
        <div className="right" id="right">
            <div className="Eventos">
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