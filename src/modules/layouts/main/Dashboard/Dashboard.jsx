import {useState, useEffect} from "react";
import "./Dashboard.css" //Importamos los estilos del componente

import Auth from "../../../Auth/Auth"; //Se usa para mandar setChangeComponent para luego de iniciar sesión mostrar el panel informativo.

/* 
    Recibimos mediante props: 
    setChangeComponent: Set que cambia cuando se inicia sesión, muestra el dashboard o panel informativo.
*/
const Dashboard = ({setChangeComponent}) => {

    const [visAuth, setVisAuth] = useState(false); //Variable que permite mostrar el componente de Login.

    return(
        <div>
            Espacio para trabajar el panel informativo -  Asley

            <button onClick={() => setVisAuth(true)}>Login</button>

            {visAuth && (
                <Auth setChangeComponent={setChangeComponent} setVisAuth={setVisAuth}/>
            )}
        </div>
    )
}

export default Dashboard;