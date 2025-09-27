import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/Store";
import { useEffect, useState } from "react";



const protectedRouters = ({children}) => {

    const {initializeUser, isVerified} = useUserStore();
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        const validateUser = async() => {
            await initializeUser()
            setLoading(false);
        };
        validateUser();
    },[initializeUser]);

    return loading ? <div>Cargando...</div> : isVerified ? children:<Navigate to={"/ingresar"} replace/>;
}

export default protectedRouters;