import {useState,useEffect} from "react";

//Importamos los modulos de perfil.
import InfoPersonal from "../../modules/Profile/InfoPersonal/InfoPersonal";
import AboutMe from "../../modules/Profile/AboutMe/AboutMe";

//Importamos las páginas que salen de perfil.
import Configuration from "../Configuration/Configuration";
import Publications from "../Publications/Publications";

const Profile = () => {

    return(
        <div>
            Espacio para trabajar el componente de perfil
            {<InfoPersonal/>}
            {<AboutMe/>}
            {<Configuration/>}
            {<Publications/>}
            
        </div>
    )
}

export default Profile;