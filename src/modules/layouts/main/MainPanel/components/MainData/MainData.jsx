import React, { useEffect } from "react";
import { useUserStore } from "../../../../../../App/stores/Store";

const MainData = () =>{

    const {username, initializeUser} = useUserStore(); //Función para inicializar el usuario.
    useEffect (() => { 
        initializeUser(); 
        const interval = setInterval(() => {
            initializeUser()
        }, 5*60*1000); //Valida cada 5 minutos.
        return () => clearInterval(interval) 
    },[initializeUser])

    return(
        <div>
            {username}
        </div>
    )
}

export default MainData;