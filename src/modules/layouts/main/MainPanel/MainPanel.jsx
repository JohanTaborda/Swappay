import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; //Importamos useLocation para validar rutas.

import MainHeader from "./components/MainHeader/MainHeader"; //Importamos el componente General que siempre se mostrara.
import ProductForm from "../../../../modules/products/ProductForm/ProductForm";

//Importamos los componentes que cambiaran según la ruta existente.
import MainData from "./components/MainData/MainData";
import Profile from "../../../../pages/Profile/Profile.jsx";
import Configuration from "../../../../pages/Configuration/Configuration.jsx";
import Offers from "../../../../pages/Offers/Offers.jsx";
import Exchanges from "../../../../pages/Exchanges/Exchanges.jsx";
import { IoAdd } from "react-icons/io5";
import "./MainPanel.css"

const MainPanel = () =>{
    const location = useLocation(); //Usamos el hook de useLocation para ver la ubicación actual.
    const [sectionDisplay, setSectionDisplay] = useState(false);
    let contentSection; //Variable que almacena el componente a renderizar según la ruta en el pathname.

    //Condicionales que validan que componente mostrar según la opción.
    if (location.pathname === '/perfil') contentSection = <Profile/>;
    else if (location.pathname === '/ofertas') contentSection = <Offers/>;
    else if (location.pathname === '/intercambios') contentSection = <Exchanges/>;
    else contentSection = <MainData/>;

    useEffect(() => {
        if (location.pathname === '/panel' || location.pathname === '/ofertas' || location.pathname === '/intercambios' ) setSectionDisplay(true);
        else setSectionDisplay(false);
    }, [location.pathname]);

    const [showModal, setShowModal] = useState(false); //Estado para controlar el modal.

    return (
        <div>
            <MainHeader />
            {contentSection}
        
            <button className="buttonProductForm"  style={{ display: sectionDisplay ? "" : "none" }} onClick={() => setShowModal(true)} title="Abrir formulario"> <IoAdd /> </button> {/*Botón flotante para abrir el formulari. Al dar click showModal a true (abre el modal)*/}
            <ProductForm open={showModal} onClose={() => setShowModal(false)} /> {/*Componente del formulario de producto dentro de un modal*/}
        </div>
    );
}

export default MainPanel;