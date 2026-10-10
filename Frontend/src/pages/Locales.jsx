import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import { localManager } from "../components/localManager.jsx";
import Button from "@mui/material/Button";

const tabla = [
    {
        id: "local",
        label: "administracion locales",
        component: localManager
    },
];

export default function Locales() {
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(tabla[0].id);
    const TabComponent = tabla.find((t) => t.id === tabActiva)?.component;

    return (
        <div className= "right" id="right">
            <div className="Locales">
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