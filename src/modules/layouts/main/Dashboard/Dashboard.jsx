import {useState, useEffect} from "react";
import "./Dashboard.css"

import Auth from "../../../Auth/Auth"; //Se usa para mandar setChangeComponent para luego de iniciar sesión mostrar el panel informativo.

const Dashboard = ({setChangeComponent}) => {

    const [visAuth, setVisAuth] = useState(false)

    return(
        <div>
            Espacio para trabajar el panel informativo -  Asley

            <button onClick={() => setVisAuth(true)}>Login</button>

            {visAuth && (
                <Auth setChangeComponent={setChangeComponent}/>
            )}
        </div>
    )
}

export default Dashboard;