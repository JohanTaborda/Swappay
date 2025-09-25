import {useState, useEffect} from "react";
import "./ChangePassword.css"

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import {Typography, TextField, Button, InputAdornment} from '@mui/material';

import { IoMdEye, IoMdEyeOff  } from "react-icons/io";
import api from "../../../service/axiosConfig";

const ChangePassword = () => {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const viewPassword = () => <IoMdEye color="#525151ff" fontSize={"22px"}/>
    const viewOffPassword = () => <IoMdEyeOff color="#525151ff" fontSize={"22px"}/>

    const { register, handleSubmit, control } = useForm();

    const onSubmit = (formData) => {
        const {currentPassword, newPassword, confirmPassword} = formData;

        //Validamos que las contraseñas coincidan.
        if (newPassword !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.", {position: "top-center"});
            return;
        }

        console.log(currentPassword, newPassword, confirmPassword)
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form_config_profile">
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