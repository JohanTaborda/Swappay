import {useState, useEffect} from "react";
import "./Publications.css"

const Publications = () => {
    
    return(
        <div className="container_publications_profile">
            <h1 className="title_publications_profile">Mis publicaciones</h1>
            <div className="container_button_info">
                <h5 className="info_publications_profile">No hay publicaciones disponibles.</h5>
                <button className="button-create-publications-profile">Crear Publicación</button>
            </div>
        </div>
    )
}

export default Publications;