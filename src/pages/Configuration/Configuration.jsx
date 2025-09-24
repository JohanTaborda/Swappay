import {useState, useEffect} from "react";
import "./Configuration.css"

import { Paper, Tabs, Tab, Box, Typography, TextField, Button, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


import EditProfile from "../../modules/Configuration/EditProfile/EditProfile";

const Configuration = () => {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return(
        <div>            
            <Paper>
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" scrollButtons="auto">
                    <Tab className='titleTabs' label="Perfil" />
                    <Tab className='titleTabs' label="Contraseña" />
                    <Tab className='titleTabs' label="Imagen de perfil" />
                    <Tab className='titleTabs' label="Eliminar cuenta" />
                </Tabs>

                <Box sx={{ p: 3 }} className="container_box_configuration">
                    {tabValue === 0 && (
                        <EditProfile/>
                    )}
                    
                    {tabValue === 1 && (
                        <div>
                            <Typography variant="h6">Cambiar Contraseña</Typography>
                            <TextField fullWidth label="Contraseña Actual" type="password" margin="normal" />
                            <TextField fullWidth label="Nueva Contraseña" type="password" margin="normal" />
                            <Button variant="contained" sx={{ mt: 2 }}>Actualizar</Button>
                        </div>
                    )}
                    
                    {tabValue === 2 && (
                        <div>
                            <Typography variant="h6">Imagen de Perfil</Typography>
                            <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
                            <Button variant="contained">Subir Imagen</Button>
                        </div>
                    )}
                    
                    {tabValue === 3 && (
                        <div>
                            <Typography variant="h6" color="error">Eliminar Cuenta</Typography>
                            <Button variant="contained" color="error">Eliminar</Button>
                        </div>
                    )}
                </Box>
            </Paper>
        </div>
    )
}

export default Configuration;