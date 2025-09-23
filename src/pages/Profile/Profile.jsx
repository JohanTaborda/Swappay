import {useState,useEffect} from "react";
import "./Profile.css"

import { useLocation } from "react-router-dom";//Activamos la localicación de las rutas.

//Importamos los modulos de perfil.
import InfoPersonal from "../../modules/Profile/InfoPersonal/InfoPersonal";
import AboutMe from "../../modules/Profile/AboutMe/AboutMe";

//Importamos las páginas que salen de perfil.
import Configuration from "../Configuration/Configuration";
import Publications from "../Publications/Publications";

const Profile = () => {

    const location = useLocation(); //Usamos useLocation para ver la ruta actual del usuario.
    let viewSection;
    //Condicionales que permiten activar el componente necesario según la ruta del usuario.
    if (location.pathname === '/perfil') viewSection = <AboutMe/>;
    else if (location.pathname === '/perfil/publicaciones') viewSection = <Publications/>;
    else if (location.pathname === '/perfil/editar-perfil') viewSection = <Configuration/>;

    return(
        <>
            <div className="container_profile_user">
                <section className="header_general_user">
                    {<InfoPersonal/>}
                </section>
                <section className="section_user_profile">
                    {viewSection}
                </section>
            </div>
        </>
    )
}

export default Profile;