import React from "react";
import "./carrusel.css";

const Carrusel = ({nombre, imagen, descrip}) => {

    return(
        <div className="carruselCard">
            <div className="carruselIcon">
                <img src={imagen} alt={nombre} />
            </div>
            <h2>{nombre}</h2>
            <p>{descrip}</p>
        </div>
    )
}

export default Carrusel;

