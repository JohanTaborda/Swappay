import {useState, useEffect} from "react";
import "./InfoPersonal.css"

import { useNavigate, useLocation } from "react-router-dom"; //Activamos la navegación y localicación de las rutas.

import Avatar from '@mui/material/Avatar'; //Componente para el perfil del usuario
import Rating from '@mui/material/Rating'; //Componente para la calificación del usuario.
import Stack from '@mui/material/Stack'; //Componente de layout para organizar las estrellas del usuario.

const InfoPersonal = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const[sectionSelected, setSectionSelected] = useState("Sobre mi"); //Estado que cambia según la sección seleccionada a mostrar.
    const[visButtonConfig, setVisButtonConfig] = useState(true);

    const stringAvatar = (name) => { //Función que permite mostrar N cantidad de letras [1 o 2] en la imagen de perfil, según el nombre de usuario.
        const parts = name.split(" ");
        const initials = parts.length === 1 ? parts[0][0] : `${parts[0][0]}${parts[1][0]}`; 
        return {children: initials,};
    };

    const valueSections = [ //Arreglo de objetos que almacena la información de las 'páginas' correspondientes.
        {name: "Sobre mi", href: "/perfil"},
        {name: "Mis publicaciones", href: "/perfil/publicaciones"}
    ]

    const changeSection = (name, href) => { //Función que permite el cambio de las rutas.
        setSectionSelected(name)
        navigate(href)
    }

    useEffect(() => { //Hook que actualiza el setter de sectionSelected para el que corresponde con la ruta actual.
        if (location.pathname === "/perfil")setSectionSelected("Sobre mi");
        else if (location.pathname === "/perfil/publicaciones") setSectionSelected("Mis publicaciones");
        else setSectionSelected("")
    }, [location.pathname]);

    useEffect(() => { 
        if (location.pathname === "/perfil/configuracion")setVisButtonConfig(false);
        else setVisButtonConfig(true);
    }, [location.pathname]);


    return(
        <div className="container_info_profile">
            <section className="Profile_photo">
                <Avatar
                    className="photo_user"
                    {...stringAvatar('Johan Taborda')} //En el Avatar del perfil, se muestran las iniciales del nombre.
                />
            </section>
            <section className="navigate_sections_profile">
                {valueSections.map((value, index) => (
                    <a key={index} onClick={() => changeSection(value.name, value.href)} id={sectionSelected === value.name ? "equal_option_selected" : ""}>{value.name}</a>
                ))}
            </section>
            <section className="priority_info_user">
                <h5>Nombre de usuario</h5>
                <h5>Pais</h5>
                <h5>
                    <Stack spacing={1} className="rating_users">
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly /> {/*Estrellas de calificación en solo lectura.*/}
                    </Stack>
                </h5>
            </section>
            <section className="action_edit_profile">
                {visButtonConfig && (
                    <button onClick={() => navigate('/perfil/configuracion')} className="button_edit_profile">Configuración</button>
                )}
            </section>
        </div>
    )
}

export default InfoPersonal;
