import {useState, useEffect} from "react";
import "./ChangePassword.css"

import { useForm } from "react-hook-form"; //Importamos el hook para manejar la información del formulario.
import { ToastContainer, toast } from 'react-toastify'; //Importamos toast para sacar los push con mensajes informativos.
import {Typography, TextField, Button, InputAdornment} from '@mui/material'; //Importamos componentes a utilizar de MaterialUI

import { IoMdEye, IoMdEyeOff  } from "react-icons/io"; //Importamos iconos para las contraseñas.
import api from "../../../service/axiosConfig"; //Importamos API para comunicarnos con el backend.

const ChangePassword = () => {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false); //Estado que permite la visualización de la contraseña actual.
    const [showNewPassword, setShowNewPassword] = useState(false);//Estado que permite la visualización de la nueva contraseña.
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);//Estado que permite la visualización de la confirmación de la nueva contraseña.

    const viewPassword = () => <IoMdEye color="#525151ff" fontSize={"22px"}/> //Manejamos los iconos como funciones para mayor claridad. Icono para visualizar la contraseña.
    const viewOffPassword = () => <IoMdEyeOff color="#525151ff" fontSize={"22px"}/>//Manejamos los iconos como funciones para mayor claridad. Icono para ocultar la contraseña.

    const { register, handleSubmit, control } = useForm(); //Usamos las funciones que nos trae el hook de useForm, para el manejo de formulario.

    const onSubmit = (formData) => { //Función que se llama cuando se envia el formulario
        const {currentPassword, newPassword, confirmPassword} = formData; //Desestructuramos el objeto con la contraseña del usuario.

        //Validamos que las contraseñas coincidan.
        if (newPassword !== confirmPassword) { //Si la contraseña nueva y la de confirmación son diferentes, me saca un toast indicando el error.
            toast.error("Las contraseñas no coinciden.", {position: "top-center"}); //Toast informativos.
            return;
        }

        console.log(currentPassword, newPassword, confirmPassword) //Mostramos las contraseñas por consola.
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form_config_profile"> {/*Usamos formulario para el menejo de las contraseñas*/}
                <Typography variant="h6" style={{fontFamily:"Outfit"}}>Cambiar Contraseña</Typography>
                
                <TextField 
                    {...register("currentPassword")} 
                    label="Contraseña actual" 
                    type={showCurrentPassword ? "text" : "password"} 
                    sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} 
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setShowCurrentPassword(!showCurrentPassword)} style={{cursor: 'pointer'}}>
                                {!showCurrentPassword ? viewOffPassword() : viewPassword()}
                            </InputAdornment>
                        )
                    }}
                />
                                
                <TextField
                {...register("newPassword", {required: true,minLength: {value: 6,message: "La nueva contraseña debe tener mínimo 6 caracteres"}})}
                label="Nueva contraseña"
                type={showNewPassword ? "text" : "password"}
                sx={{"& .MuiInputLabel-root": { fontFamily: "Outfit" },"& .MuiInputBase-input": { fontFamily: "Manrope" }}}
                required
                inputProps={{minLength: 6, onInvalid: (e) => {e.target.setCustomValidity("La nueva contraseña debe tener mínimo 6 caracteres"); },
                    onInput: (e) => {e.target.setCustomValidity(""); }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end"onClick={() => setShowNewPassword(!showNewPassword)}style={{ cursor: "pointer" }} >
                            {!showNewPassword ? viewOffPassword() : viewPassword()}
                        </InputAdornment>
                    )
                }}
                />

                <TextField 
                    {...register("confirmPassword")} 
                    label="Confirmar nueva contraseña" 
                    type={showConfirmPassword ? "text" : "password"} 
                    sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} 
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{cursor: 'pointer'}}>
                                {!showConfirmPassword ? viewOffPassword() : viewPassword()}
                            </InputAdornment>
                        )
                    }}
                />
                
                <Button variant="contained" type="submit" sx={{ mt: 2 }} className="button-change-password">Actualizar contraseña</Button>
            </form>
            <div>
                <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable/> {/*Paneles informativos de la aplicación.*/}
            </div>
        </>
    )
}

export default ChangePassword;