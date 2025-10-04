import {useState, useEffect} from "react";
import "./Configuration.css"

import { Paper, Tabs, Tab, Box} from '@mui/material'; //Importamos componentes de materialUI a utilizar.

//Importamos los modulos de configuración.
import EditProfile from "../../modules/Configuration/EditProfile/EditProfile"; //Modulo de edición de perfil
import ChangePassword from "../../modules/Configuration/ChangePassword/ChangePassword"; //Modulo pa cambiar la contraseña.
import DeleteProfile from "../../modules/Configuration/DeleteProfile/DeleteProfile"; //Modulo para eliminar el perfil.

const Configuration = () => {

    const [tabValue, setTabValue] = useState(0); //Estado que almacena la opción a navegar.

    const handleTabChange = (event, newValue) => { //Función que permite navegar entre las secciones del paper.
        setTabValue(newValue);
    };


    return(
        <div>            
            <Paper className="container_general_configuration">
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" scrollButtons="auto"> {/*Secciones a navegar.*/}
                    <Tab className='titleTabs' label="Perfil" />
                    <Tab className='titleTabs' label="Contraseña" />
                    <Tab className='titleTabs' label="Eliminar cuenta" />
                </Tabs>

                <Box sx={{ p: 3 }} className="container_box_configuration"> {/*Según la opción seleccionada, navegamos a uno de los modulos. */}
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