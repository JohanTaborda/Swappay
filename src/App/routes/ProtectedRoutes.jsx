import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/Store";
import { useEffect, useState } from "react";



const protectedRouters = ({children}) => {

    const {initializeUser, isVerified} = useUserStore(); //Función que valida el token.
    const [loading, setLoading] = useState(true); //Estado para mostrar una carga mientras los datos se traen del back.
    useEffect (() => {
        const validateUser = async() => { //Valida el token y actualiza el estado.
            await initializeUser()
            setLoading(false);
        };
        validateUser();
    },[initializeUser]);

    return loading ? <div>Cargando...</div> : isVerified ? children:<Navigate to={"/ingresar"} replace/>;
}

export default protectedRouters;