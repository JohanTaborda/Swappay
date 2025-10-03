
import React, { useEffect } from "react";
import { useUserStore } from "../../../../../../App/stores/Store";
import { useNavigate } from "react-router-dom";
import Carrusel from "../../../../../../components/carrusel/carrusel";
import Computer from "../../../../../../resources/images/computer.png";
import Discount from "../../../../../../resources/images/discount.png";
import Change from "../../../../../../resources/images/change.png";
import "./MainData.css";

const MainData = () =>{

    const navigate = useNavigate();
    const {username, initializeUser} = useUserStore(); //Función para inicializar el usuario.
    useEffect (() => { 
        initializeUser(); 
        const interval = setInterval(() => {
            initializeUser()
        }, 60*60*1000); //Valida cada 5 minutos.
        return () => clearInterval(interval) 
    },[initializeUser])

    const Carousel = [ //Arreglo que contiene los datos para las tarjetas del carrusel
        {name: "Intercambios", img: Change, descr: "Intercambia lo que ya no usas por lo que realmente necesitas. Conecta con otros usuarios de forma práctica y segura, generando oportunidades de ahorro.", ruta: "/intercambios"},
        {name: "Ofertas", img: Discount, descr: "Accede a descuentos únicos en productos seleccionados, pero solo podrás adquirirlos utilizando tus Swappcoins.", ruta: "/ofertas"}
    ]

    return(
        <div className="mainData">   
            <section className="mainDataHero">
                <div className="mainDataContainerHero">  {/*Crea mensaje de bienvenida personalizado*/}
                    <h3>Bienvenid@ {username}</h3>
                    <p>En este espacio podrás intercambiar, descubrir promociones y aprovechar al máximo tus Swapcoins.</p>
                </div>
                <div className="mainDataImageHero">
                     <img src={Computer} alt="" />
                </div>
            </section>
                
            {/*Crea una tarjeta por cada elemento del array Carousel con navegacion*/}
            <section className="mainDataCarruselContainer"> 
                {Carousel.map((value, index) =>( 
                    <div key={index} onClick={() => navigate(value.ruta)}>
                        <Carrusel nombre={value.name} imagen={value.img} descrip={value.descr}/>
                    </div>
                ))}

            </section>

            <footer className="mainDataFooter">
                <p>&copy; 2025 Swappay. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default MainData;

