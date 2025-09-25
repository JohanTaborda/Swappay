import {useState, useEffect} from "react";
import "./Configuration.css"

import { Paper, Tabs, Tab, Box} from '@mui/material';


import EditProfile from "../../modules/Configuration/EditProfile/EditProfile";
import ChangePassword from "../../modules/Configuration/ChangePassword/ChangePassword";
import DeleteProfile from "../../modules/Configuration/DeleteProfile/DeleteProfile";

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
                    <Tab className='titleTabs' label="Eliminar cuenta" />
                </Tabs>

                <Box sx={{ p: 3 }} className="container_box_configuration">
                    {tabValue === 0 && (
                        <EditProfile/>
                    )}
                    
                    {tabValue === 1 && (
                        <ChangePassword/>
                    )}
                    
                    {tabValue === 2 && (
                        <DeleteProfile/>
                    )}
                </Box>
            </Paper>
        </div>
    )
}

export default Configuration;