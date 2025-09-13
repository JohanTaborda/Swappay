import {useState, useEffect} from "react";
import "./Login.css" //Importamos los estilos del Login 
import data from "./Login.json" //Importamos el JSON con los datos quemados para pruebas.

//Importamos Toast para los paneles informativos.
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { IoClose } from "react-icons/io5"; //Importamos el icono para cerrar la ventana
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import api from "../../service/axiosConfig";
/* Recibimos mediante props: 
setChangeComponent: Cambia cuando se inicia sesión, muestra el dashboard o panel informativo.
setVisLogin: Permite alternar la visibilidad del Login y Registro, este cambia cuando se le da al botón de 'Registrarse'
setVisAuth: Alterna la visibilidad del Login, para ocultar cuando se le de clic al icono de 'Close'*/
const Login = ({setChangeComponent, setVisLogin, setVisAuth}) => {

    const navigate= useNavigate();
    const [email, setEmail] = useState(""); //Variable que almacena el email digitado en el imput
    const [password, setPassword] = useState("");//Variable que almacena la contraseña digitada en el imput
    const [visPassword, setVisPassowrd] = useState(false);
    
    const iconClose = () => <IoClose className="iconClose" onClick={() => navigate("/")}/> //Icono para cerrar la ventana
    const viewPassword = () => <IoMdEye color="#525151ff"/>
    const viewOffPassword = () => <IoMdEyeOff color="#525151ff"/>

    const handleSubmit = async (e) => { //Fuinción que se llama cuando damos clic al botón de 'Ingresar'
        e.preventDefault(); 

        // Validación básica de campos vacíos
        if (!email.trim() || !password.trim()) {
            toast.error("Correo y contraseña obligatorios", {position: "top-right",autoClose: 2000,hideProgressBar: false,closeOnClick: true,
                pauseOnHover: true,draggable: true, progress: undefined,});
            return;
        }

        try {

            const response = await api.post("/auth/login", {
                email, 
                password
            })

            const data = response.data;

            console.log(data)

            toast.success(`¡Bienvenid@! ${data.username}`, { position: "top-center",autoClose: 1500,hideProgressBar: false,closeOnClick: true,
            pauseOnHover: true,draggable: true,progress: undefined,});

            setTimeout(() => { //Damos una espera de 2 segundos para iniciar sesión.
                navigate("/panel")
            }, 2000);
            
        } catch (error) {
            console.log(`errores: ${error}`)
        }

    };

    return(
        <div className="overlayGeneral">
            <div className="containerGeneralOverlay" id="Logo_Body_Login">
                <div className="containerLogo">
                    <img src="src\resources\images\Designer.png" alt="Logo" className="imgLogo"/> {/*Logo de la aplicación*/}
                    <h1 className="textWelcome">Bienvenid@</h1> 
                    <p className="textDescriptionLogin">Vende, intercambia y aprende en la plataforma que conecta personas con oportunidades.</p>
                </div>
                
                <section className="containerBodylogin">
                    {iconClose()}{/*Icono para cerrar la ventana emergente.*/}
                    <h2 className="textIniciarSesion">Inicia Sesión</h2>
                    <form onSubmit={handleSubmit} className="formDataLogin"> {/*Formulario para iniciar sesión*/}
                        <div>
                            <h5 className="infoInputLogin">Correo Electrónico:</h5>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="input_Credential"/>
                        </div>
                        <div>
                            <h5 className="infoInputLogin">Contraseña:</h5>
                            <div style={{position:"relative"}}>
                                <input type={`${visPassword ? "text" : "password"}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="***********" className="input_Credential"/>
                                <span onClick={() => setVisPassowrd(!visPassword)} className="eyeViewPassword">{!visPassword ? viewOffPassword() : viewPassword()}</span>
                            </div>
                        </div>
                        <div className="btnLoginWelcome">
                            <button id="BtnWelcome">Ingresar</button> {/*Botón que llama la función de handleSubmit para el inicio de sesión*/}
                        </div>
                        <div >
                            <hr style={{border: 'none', borderTop: '1px solid #000', margin: '0 0'}} />
                        </div>
                        <div className="infoRegistroLogin">
                            <p>¿No tienes cuenta? <label className="clicRegister" onClick={()=> navigate("/registro")}>Regístrate aquí</label></p> 
                        </div>
                    </form>
                </section>

            </div>
            <div>
            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable/> {/*Paneles informativos de la aplicación.*/}
            </div>
        </div>
    )
}

export default Login;