import {useState, useEffect} from "react";
import "./Register.css" //Importamos los estilos del componente

import { useForm } from "react-hook-form" // Importamos react-hook-form para el manejo de formularios

//Importamos Toast para los paneles informativos.
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { IoClose } from "react-icons/io5"; //Importamos el icono para cerrar la ventana

// Recibe dos props: setVisLogin y setVisAuth para controlar la visibilidad de pantallas de login y autenticación.
const Register = ({setVisLogin, setVisAuth}) => {

    const iconClose = () => <IoClose className="iconCloseRegister" onClick={() => setVisAuth(false)}/> //Icono para cerrar la ventana
    
    // Configuramos el hook useForm de react-hook-form, register -> registra inputs
    // handleSubmit -> maneja el envío del formulario, watch -> observa cambios en los campos, errors -> contiene errores de validación
    const {register,handleSubmit, watch, formState: { errors },} = useForm()

    const onSubmit = (formData) => { // Función que se ejecuta al enviar el formulario
        const { password, confirmPassword, firstName, lastName, email, city} = formData;
      
        //Validamos que las contraseñas coincidan.
        if (password !== confirmPassword) {
          toast.error("Las contraseñas no coinciden");
          return;
        }

        toast.success("¡Registro completado!", {position: "top-center"});

        setTimeout(() => {
            setVisLogin(true)
        }, 2000);
    }
    
    useEffect(() => { // useEffect se encarga de escuchar los errores del formulario y mostrar mensajes con Toast
        if (errors.firstName?.type === "required") toast.error("El nombre es obligatorio");
        if (errors.lastName?.type === "required") toast.error("El apellido es obligatorio");
        if (errors.email?.type === "required") toast.error("El correo es obligatorio.");
        if (errors.city?.type === "required") toast.error("La ciudad es obligatoria.");
        if (errors.password?.type === "required") toast.error("La contraseña es obligatoria");
        if (errors.confirmPassword?.type === "required") toast.error("La confirmación de contraseña es obligatoria.");
    }, [errors]);

    return(
        <div className="overlayGeneral">
            <div className="containerGeneralOverlay" id="bodyGeneralRegister">
                <div className="containerLogo">
                    <img src="src\resources\images\Designer.png" alt="Logo" className="imgLogo"/> {/*Logo de la aplicación*/}
                    <h1 className="textWelcome">Bienvenid@</h1> 
                    <p className="textDescriptionLogin">Vende, intercambia y aprende en la plataforma que conecta personas con oportunidades.</p>
                </div>
                
                <section className="containerBodyRegister">
                    {iconClose()}
                   <h2 className="titleSectionRegister">Crea tu cuenta</h2>
                    <form  className="formRegister" autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)} //Manejamos el evento onSubmit del formulario y llamamos a la función onSubmit al enviar el formulario.
                    > 
                        {/* Inputs del formulario de registro */}
                        <div className="inputNameComplet">
                            <input   {...register("firstName", { required: "El nombre es obligatorio", minLength: {value: 3, message: "Minimo 3 Caracteres" },})} placeholder="Nombre" minLength={3}
                            className={`form--input ${errors.firstName ? "input-error" : ""}`} pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$" title="Solo letras, mínimo 3 caracteres" type="text"/> {/* Validamos el nombre */}

                            <input   {...register("lastName", { required: "El apellido es obligatorio", minLength: {value: 3, message: "Minimo 3 Caracteres" }})} placeholder="Apellido" type="text"
                            minLength={3} title="Solo letras, mínimo 3 caracteres" pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$" className={`form--input ${errors.lastName ? "input-error" : ""}`} /> {/* Validamos el apellido */}
                        </div>
                        <input {...register("email", { required: true })} autoComplete="off" placeholder="Email"  type="email" className={`form--input ${errors.email ? "input-error" : ""}`}/> {/* Validamos el correo electrónico */}
                       
                        <input {...register("city", { required: true, minLength: {value: 3, message: "Minimo 3 Caracteres" }})} minLength={3} title="Mínimo 3 caracteres" placeholder="Escribe tu ciudad" type="text" className={`form--input ${errors.city ? "input-error" : ""}`}/> {/* Validamos el correo electrónico */}

                        <input   {...register("password", { required: "La contraseña es obligatoria", minLength: {value: 6, message: "Minimo 6 Caracteres" }})} minLength={6} title="Mínimo 6 caracteres"
                            placeholder="Contraseña"  type="password"  className={`form--input ${errors.password ? "input-error" : ""}`}/> {/* Validamos la contraseña */}
                            
                        <input {...register("confirmPassword", { required: true })} placeholder="Confirmar Contraseña" type="password" className={`form--input ${errors.confirmPassword ? "input-error" : ""}`}/> {/* Validamos la confirmación de la contraseña */}

                        <button  type="submit"  className="btnRegister"  >
                            Regístrate
                        </button>
                    </form>
                    <div className="infoRegistroLogin" id="infoRegister">
                        <p>¿Ya tienes cuenta? <label className="clicRegister" onClick={()=> setVisLogin(true)}>Inicia sesión</label></p> 
                    </div>
                </section>

            </div>
            <div>
                <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable/>  {/*Paneles informativos de la aplicación.*/}
            </div>
        </div>
    )
}

export default Register;