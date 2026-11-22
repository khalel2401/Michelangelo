import {useNavigate} from 'react-router-dom';
import { Component, useState } from 'react';
import { vehiculoManager } from "../components/vehiculoManager.jsx";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const table = [
    {
        id: "vehiculos",
        label: "administracion vehiculos",
        component: vehiculoManager
    },
];

export default function Vehiculos(){
    
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(table[0].id);
    const TabComponent = table.find((t) => t.id === tabActiva)?.component;

    return (
        <Container maxWidth="lg">
            <Box>
                <Box component="tab-content">
                    {TabComponent && <TabComponent/>}
                </Box>
            </Box>
            <Button variant="contained" onClick={() => navigate('/')}>Volver al menu</Button>
        </Container>
    );
}