import {useState, useEffect} from "react";

import Login from "../../pages/Login/Login"; //Importamos el componente de Login
import Register from "../../pages/Register/Register"; //Importamos el componente de registro.

/* Recibimos mediante props: 
setChangeComponent: Cambia cuando se inicia sesión, muestra el dashboard o panel informativo.
setVisAuth: Alterna la visibilidad del Login, para ocultar cuando se le de clic al icono de 'Close'
*/
const Auth = ({setChangeComponent, setVisAuth}) => {

    const [visLogin, setVisLogin] = useState(true); //Variable que permite alternar la visibilidad de los componentes 'Login' y 'Register'.

    return(
        <>
            {visLogin ? ( //Si visLogin es true, mostramos el Login, de lo contrario mostramos el componente de 'Register'.
                <Login setChangeComponent={setChangeComponent} setVisLogin={setVisLogin} setVisAuth={setVisAuth}/>
            ) : (
                <Register setVisLogin={setVisLogin}  setVisAuth={setVisAuth}/>
            )}
        </>
    )
}

export default Auth;