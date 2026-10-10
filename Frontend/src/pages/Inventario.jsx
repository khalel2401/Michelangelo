import {useNavigate} from "react-router-dom";
import { Component, useState } from 'react';
import { inventarioManager } from "../components/inventarioManager.jsx";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const table = [
    {
        id: "inventario",
        label: "administracion inventario",
        component: inventarioManager
    },
];

export default function Inventario(){
    const navigate = useNavigate();
    const [tabActiva, setTabActiva] = useState(table[0].id);
    const TabComponent = table.find((t) => t.id === tabActiva)?.component;

    return (
        <Container maxWidth="lg">
            <Box component="articulos">
                <Box component="tab-content">
                    {TabComponent && <TabComponent/>}
                </Box>
            </Box>
            <Button variant="contained" onClick={() => navigate('/')}>Volver al menu</Button>
        </Container>
    );
}