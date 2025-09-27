import React, { useEffect } from "react";
import { useUserStore } from "../../../../../../App/stores/Store";

const MainData = () =>{

    const {username, initializeUser} = useUserStore();
    useEffect (() => { 
        initializeUser();
        const interval = setInterval(() => {
            initializeUser()
        }, 5*60*1000);
        return () => clearInterval(interval) 
    },[initializeUser])

    return(
        <div>
            {username}
        </div>
    )
}

export default MainData;