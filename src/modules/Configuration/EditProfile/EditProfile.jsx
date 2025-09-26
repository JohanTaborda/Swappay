import { useState, useEffect } from "react";
import "./EditProfile.css"

import { useForm, Controller } from "react-hook-form" //Usamos el hook de useForm, para generar el JSON con los datos que digite el usuario.
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress} from '@mui/material'; //Importamos componentes de material-UI a utilizar.

import { useNavigate } from "react-router-dom"; //Importamos el hook para navegar entre rutas

import api from "../../../service/axiosConfig";  //Importamos la comunicación con el backend.

const EditProfile = () => {

    const { register, handleSubmit, control } = useForm({
        defaultValues: { //Definimos los valores por defecto que tendra cada propiedad del formulario
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

    const navigate = useNavigate(); //Usamos navigate para navegar entre rutas.
    const [loading, setLoading] = useState(true); //Estado de carga para cuando este conectado con el backend
    const [cities, setCities] = useState([]); //Almacenamos las ciudades que vienen del backend.
    const [editProfile, setEditProfile] = useState(false); //Estado para permitir editar los campos del componente.
    const [success, setSuccess] = useState(false); //Estado que cambia si el formulario se envia correctamente.

    useEffect(() => { //Hook que contiene una función para comunicarnos con el backend.
        const obtainCountry = async () => { //Función asincrona que trae los paises desde el backend.
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

    const typeGender = [ //Array de objetos que almacena las opciones para el campo de genero.
        { id: "", name: "--Seleccionar--" },
        { id: "masculino", name: "Masculino" },
        { id: "femenino", name: "Femenino" },
        { id: "other", name: "No quiero especificar" }
    ];

    const submitProfile = (formData) => { //Función que se llama cuando se envia el formulario.
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

    const changeEditButton = (e) => { //Función que cambia el botón entre editar/guardar.
        e.preventDefault();
        e.stopPropagation(); //Evita la propagación de un botón a otro.
        setEditProfile(!editProfile);
    }

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
                                {cities.map((country, index) => ( //Mapeamos el array de paises para mostrarlos en el dropdown.
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
                                {typeGender.map((gender, index) => ( //Mapeamos typeGender para mostrar los generos.
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

            {editProfile ? ( //Si editProfile es verdadero se muestra Guardar Cambios, sino, se muestra Editar perfil.
                <Button variant="contained" type="submit" sx={{ mt: 2 }} className="button-editProfile" disabled={success} startIcon={success ? <CircularProgress size={20} color="inherit" /> : null} >
                    {success ? "Guardando..." : "Guardar cambios"} {/*Si el formulario se envio exitosamente, se muestra el mensaje de guardando, sino, sigue en Guardar cambios. */}
                </Button>
            ) : (
                <Button variant="contained" type="button" onClick={changeEditButton} sx={{ mt: 2 }} className="button-editProfile">
                    Editar perfil
                </Button>
            )}

        </form>
    );
};

export default EditProfile;
