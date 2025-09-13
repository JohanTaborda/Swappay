import {useState, useEffect} from "react";

import Dashboard from "./Dashboard/Dashboard"; //Importamos el Dashboard
import MainPanel from "./MainPanel/MainPanel"; //Importamos el MainPanel
import { Outlet } from "react-router-dom";

const Main = () =>{

    const [visDashboard, setVisDashboard] = useState(true); //Variable que permite alternar la visibilidad entre el componente de 'Dashboard' y 'MainPanel'.

    return(
        <>
            {visDashboard ? ( //Si visDashBoard es verdadero, se muestra dicho componente, de lo contrario se muestra el 'MainPanel'.
                <Dashboard setChangeComponent={setVisDashboard} />
            ) : (
                <>
                    <MainPanel/>
                    <Outlet />
                </>
                
            )}
        </>
    )
}

export default Main;