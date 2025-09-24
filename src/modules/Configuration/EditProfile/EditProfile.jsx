import { useState, useEffect } from "react";
import "./EditProfile.css"

import { useForm, Controller } from "react-hook-form"
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress} from '@mui/material';

import { useNavigate } from "react-router-dom";

import api from "../../../service/axiosConfig";

const EditProfile = () => {

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            username: '',
            email: '',
            country: '',
            city: '',
            phone: '',
            gender: '',
            dateBirth: '',
            address: ''
        }
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [editProfile, setEditProfile] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const obtainCountry = async () => {
            try {
                const { data } = await api.get("/users/countries");
                setCities(data);
                setLoading(false);
            } catch (error) {
                setLoading(true);
                console.log("Error al obtener los países.");
            }
        };
        obtainCountry();
    }, []);

    const typeGender = [
        { id: "", name: "--Seleccionar--" },
        { id: "hombre", name: "Hombre" },
        { id: "mujer", name: "Mujer" },
        { id: "other", name: "No quiero especificar" }
    ];

    const submitProfile = (formData) => {
        try {
            setSuccess(true);
            console.log("Formulario de perfil recibido:", formData);
            
            setTimeout(() => {
                setEditProfile(!editProfile);
                setSuccess(false);
                navigate("/perfil")
            }, 3000);
        } catch (error) {
            
        }
    };

    return (
        <form onSubmit={handleSubmit(submitProfile)} className="form_config_profile">
            <Typography variant="h6" sx={{ fontFamily: "Outfit" }}>Edición de Perfil</Typography>

            <div className="inputs_form_profile">
                <TextField {...register("username", { required: true })} label="Nombre completo" placeholder="Ej: Pepito Perez" type="text" required sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} disabled={!editProfile}/>

                <TextField {...register("email", { required: true })} label="Correo Electrónico" placeholder="Ej: tu@email.com" type="text" required sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} disabled={!editProfile}/>

                <Controller
                    name="country"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <FormControl variant="outlined" fullWidth required sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiSelect-select": { fontFamily: "Manrope" } }} disabled={!editProfile}>
                            <InputLabel id="country-label">País de residencia</InputLabel>
                            <Select {...field} labelId="country-label" label="País">
                                {cities.map((country, index) => (
                                    <MenuItem key={index} value={country.name || country}>
                                        {country.name || country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <TextField {...register("city")} label="Ciudad de residencia" placeholder="Ej: Medellín" type="text" sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} disabled={!editProfile}/>

                <TextField {...register("phone")} label="Celular" type="text" sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} disabled={!editProfile}/>

                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="outlined" fullWidth sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiSelect-select": { fontFamily: "Manrope" } }} disabled={!editProfile}>
                            <InputLabel id="gender-label">Género</InputLabel>
                            <Select {...field} labelId="gender-label" label="Género">
                                {typeGender.map((gender, index) => (
                                    <MenuItem key={index} value={gender.id}>
                                        {gender.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <TextField {...register("dateBirth")} label="Fecha Nacimiento" type="date" sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} InputLabelProps={{ shrink: true }} disabled={!editProfile}/>

                <TextField {...register("address")} label="Dirección de residencia" type="text" sx={{ "& .MuiInputLabel-root": { fontFamily: "Outfit" }, "& .MuiInputBase-input": { fontFamily: "Manrope" } }} disabled={!editProfile}/>
            </div>

            {editProfile ? (
                <Button variant="contained" type="submit" sx={{ mt: 2 }} className="button-editProfile" disabled={success} startIcon={success ? <CircularProgress size={20} color="inherit" /> : null} >
                    {success ? "Guardando..." : "Guardar cambios"}
                </Button>
            ) : (
                <Button variant="contained" onClick={() => setEditProfile(!editProfile)} sx={{ mt: 2 }} className="button-editProfile">
                    Editar Perfil
                </Button>
            )}

        </form>
    );
};

export default EditProfile;
