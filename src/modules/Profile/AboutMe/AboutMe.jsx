import { useState } from "react";
import "./AboutMe.css"

import { useUserStore } from "../../../App/stores/Store";

const AboutMe = () => {
    
    const {email} = useUserStore();
    const [infoUser, setInfoUser] = useState([ //Se crea el estado que contiene todos los valores que luego llegaran del servicio para mostrar más información del usuario.
        {nameInfo: "Fecha de registro: ", valueInfo: "12/09/2025"},
        {nameInfo: "Correo: ", valueInfo: email},
        {nameInfo: "Genero: ", valueInfo: "Masculino"},
        {nameInfo: "Dirección: ", valueInfo: "Calle 123 N13-22"},
        {nameInfo: "Ubicación: ", valueInfo: "Medellín - Colombia"},
        {nameInfo: "Teléfono: ", valueInfo: "3206427315"},
        {nameInfo: "Total intercambios: ", valueInfo: "2"},
        {nameInfo: "Total compras: ", valueInfo: "0"},
        {nameInfo: "Total Swapcoins: ", valueInfo: "150"}
    ]);
    
    const [progress, setProgress] = useState(67); // Valor de la barra de progreso.

    return (
        <div className="container_aboutme">
            <h3 className="title_section_aboutme">Información adicional</h3>
            <section className="grid_template_infoUser">
                {infoUser.map((value, index) => ( //Mapeamos el usestate para mostrar todos los valores. 
                    <div key={index} className="section_info_aboutme">
                        <div className="title_info_aboutme">{value.nameInfo}</div>
                        <div style={{fontFamily:"Manrope", fontWeight:"450"}}>{value.valueInfo}</div>
                    </div>
                ))}
            </section>
            <h3 className="title_section_aboutme" id="title_section_swapcoins">Tareas para ganar Swapcoins</h3>
            <div className="swapcoins_progress_container">
                <div className="swapcoins_progress_label">
                    <span style={{fontFamily:"Outfit", fontWeight:"500"}}>{progress}% completado</span> {/*Mensaje informativo del progreso de las tareas. */}
                </div>
                <div className="swapcoins_progress_bar">
                    <div 
                        className="swapcoins_progress_fill" 
                        style={{ width: `${progress}%` }}> {/*Barra de progreso. */}
                    </div>
                </div>

                <div className="swapcoins_tasks_list"> {/*Contenedor que almacena las tareas para ganar swapcoins */}
                    <div className="swapcoins_task">
                        <input type="checkbox" checked={true} readOnly />
                        <span>Completar perfil</span>
                        <span className="task_reward">+50 Swapcoins</span>
                    </div>
                    <div className="swapcoins_task">
                        <input type="checkbox" checked={true} readOnly />
                        <span>Realizar primer intercambio</span>
                        <span className="task_reward">+100 Swapcoins</span>
                    </div>
                    <div className="swapcoins_task">
                        <input type="checkbox" checked={false} readOnly />
                        <span>Completar 5 intercambios</span>
                        <span className="task_reward">+200 Swapcoins</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;