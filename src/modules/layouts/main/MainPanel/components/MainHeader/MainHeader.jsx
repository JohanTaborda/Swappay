import {useEffect, useState} from "react";
import "./MainHeader.css"

import { BsCoin } from "react-icons/bs"; //Importamos el icono usado para los swapcoins

//Importamos componentes a utilizar desde materialUI
import Avatar from '@mui/material/Avatar'; //Componente para el perfil del usuario
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { useNavigate, useLocation } from "react-router-dom"; //Usamos router-dom para validación y manejo de rutas.

const MainHeader = () => {

    const navigate = useNavigate(); 
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null); //Estado que permite cerrar el menu.
    const [buttonSelected, setButtonSelected] = useState("Panel"); //Estado que almacena el botón seleccionado.

    const bsCoin = () => <BsCoin color="#000" fontSize={"20px"}/> //Icono de los swapCoins

    const handleAvatarClick = (event) => {setAnchorEl(event.currentTarget);}; //Función que permite desplegar el menu cuando se le da clic al Avatar.

    const stringAvatar = (name) => { //Función que permite mostrar N cantidad de letras [1 o 2] en la imagen de perfil, según el nombre de usuario.
        const parts = name.split(" ");
        const initials = parts.length === 1 ? parts[0][0] : `${parts[0][0]}${parts[1][0]}`; 
        return {children: initials,};
    };

    const userAction = (sectionRef) => { //Función que permite navegar hacia algunas secciones según el botón seleccionado [Configuración o cerrar sesión].
        setAnchorEl(null);
        navigate(sectionRef)
    }

    const allSections = [ //Arreglo de objetos para mapearlos y mostrar las secciones disponibles.
        {name: "Panel", ref: "/panel"}, 
        {name: "Ofertas", ref: "/ofertas"},
        {name: "Intercambios", ref: "/intercambios"}
    ]

    const sectionSelected = (nameSection, refNavigate) => { //Función que permite actualizar el botón seleccionado y navegar hacia una ruta correspondiente. 
        setButtonSelected(nameSection);
        navigate(refNavigate)
    }

    return (
        <div className="container_Header_panel">
            <section className="sections_header">
                <h1 className="title_header">Swappay</h1>
                {allSections.map((value, index) => ( //Mapeamos el arreglo para mostrar las opciones.
                    <a key={index} onClick={() => sectionSelected(value.name, value.ref)} id={buttonSelected === value.name && allSections.some(section => section.ref === location.pathname) ? "buttonSelected_header" : ""}>
                        {value.name}
                    </a>
                ))}
            </section>
            <section className="sections_header">
                <div className="swapCoin_header">
                    {bsCoin()} {/*Icono de los swapcoins */}
                    <div className="info_swapcoin">Mis Swapcoins: {0}</div>
                </div>
                <Avatar
                    className="profile_user_header"
                    {...stringAvatar('Johan Taborda')} //En el Avatar del perfil, se muestran las iniciales del nombre.
                    onClick={handleAvatarClick} //Al darle clic, se despliega el menu con las opciones.
                />
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}> {/*Menu con la lista de opciones por parte del usuario.*/}
                    <MenuItem onClick={() => setAnchorEl(null)} style={{fontFamily:"Outfit"}}>
                        <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
                        Mis publicaciones
                    </MenuItem>
                    <MenuItem onClick={() => userAction('/configuracion')} style={{fontFamily:"Outfit"}} >
                        <ListItemIcon><Settings/></ListItemIcon>
                        Configuración
                    </MenuItem>
                    <MenuItem onClick={() => userAction('/')} style={{fontFamily:"Outfit"}}>
                        <ListItemIcon><Logout/></ListItemIcon>
                        Cerrar Sesión
                    </MenuItem>
                </Menu>
            </section>
        </div>
    );
}

export default MainHeader;