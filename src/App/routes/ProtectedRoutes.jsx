import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/Store";
import { useEffect, useState } from "react";

const protectedRouters = ({ children }) => {
    const { initializeUser, isVerified } = useUserStore(); // Funcion que valida el token.
    const [loading, setLoading] = useState(true); // Estado para mostrar una carga mientras los datos se traen del back.

    useEffect(() => {

        let isMounted = true; //Bandera para asegurarnos de no modificar el estado si el componente ya se desmontó

        //withLoader, es una propiedad que se recibe mediante props, en caso de no recibir un valor, el por defecto será 'false'.
        //Si es verdadero, se activa la pantalla de carga
        const validateUser = async (withLoader = false) => { //Función para la validación del usuario
            if (withLoader && isMounted) {
                setLoading(true);
            }

            try {
                await initializeUser(); //Llamamos esta función del store para verificar el token con el backend.
            } finally {
                if (withLoader && isMounted) { //Si ambos valores son verdaderos, el componente sigue montado.
                    setLoading(false); //Si esta montado, se quita el loading.
                }
            }
        };

        validateUser(true); //Llamamos la función al inicio para mostrar el 'loading' ya que el componente inicialmentes esta montado.

        const intervalId = setInterval(() => {
            validateUser(false);
        }, 60 * 60 * 1000); // Cada 1 hora se valida el usuario otra vez. Pero sin loader para no molestar con pantallas de carga.

        return () => { //Cuando el componente se desmonta.
            isMounted = false; //Se cambia la bandera para que no intente actualizar el estado
            clearInterval(intervalId); //Limpiamos el setInterval para evitar fugas en la memoria
        };

    }, [initializeUser]); //Cada vez que esta dependencia cambie, el useEffect se ejecuta.


    //Si esta cargando el componente muestra el div, si el usuario es verificado muestra el componente protegido, si no esta verificado, redirige a '/ingresar'.
    return loading ? <div></div> : isVerified ? children : <Navigate to={"/ingresar"} replace />;
};

export default protectedRouters;
