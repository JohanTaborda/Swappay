import { useEffect, useState } from "react"; 

import { Navigate } from "react-router-dom"; //Importamos el componente para redirigir entre rutas.
import { useUserStore } from "../stores/Store"; //Importamos el store para manejar los estados globales.

import { toast } from 'react-toastify'; //Importamos Toast para los paneles informativos.

const protectedRouters = ({ children }) => {
    const { initializeUser, isVerified } = useUserStore(); // Funcion que valida el token.
    const [loading, setLoading] = useState(true); // Estado para mostrar una carga mientras los datos se traen del back.

    useEffect(() => {

        let isMounted = true; //Bandera para asegurarnos de no modificar el estado si el componente ya se desmontó

        //withLoader, es una propiedad que se recibe mediante props, en caso de no recibir un valor, el por defecto será 'false'.
        //Si es verdadero, se activa la pantalla de carga
        const validateUser = async (withLoader = false) => { //Función para la validación del usuario
            if (withLoader && isMounted) { //Si es verdadero y el componente sigue montado.
                setLoading(true); //Se activa el loading
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
    if (loading) return <div></div>;

    if (!isVerified) { // Si el usuario no esta verificado, redirige a la página de login.
        toast.info("Inicia sesión para continuar.", {position: "top-center"}); // Notificación informativa al redirigir.
        return <Navigate to={"/ingresar"} replace />; //Redirige a la página de login.
    }

    return children; //Si el usuario esta verificado, muestra el componente protegido.
};

export default protectedRouters;
