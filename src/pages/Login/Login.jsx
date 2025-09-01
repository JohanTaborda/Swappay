import {useState, useEffect} from "react";
import "./Login.css"

const Login = ({setChangeComponent, setVisLogin}) => {

    return(
        <div>
            Espacio para trabajar el Login.

            <button onClick={()=>setChangeComponent(false)}>Iniciar sesión</button>
            <button onClick={()=> setVisLogin(false)}>Registrarse</button>
        </div>
    )
}

export default Login;