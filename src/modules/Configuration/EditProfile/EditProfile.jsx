import { useState, useEffect } from "react";
import "./EditProfile.css"

import { useForm, Controller } from "react-hook-form" //Usamos el hook de useForm, para generar el JSON con los datos que digite el usuario.
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress} from '@mui/material'; //Importamos componentes de material-UI a utilizar.

import { useNavigate } from "react-router-dom"; //Importamos el hook para navegar entre rutas

import { useUserStore } from "../../../App/stores/Store"; //Traemos el store para los datos del usuario.

import { toast } from "react-toastify"; //Utilizamos los push informativos.

import api from "../../../service/axiosConfig";  //Importamos la comunicación con el backend.

const EditProfile = () => {

    //Extraemos todos estos valores del store para su uso.
    const {username, country, email, id, setUserInfo, setUser, userInfo} = useUserStore();

    const { register, handleSubmit, control } = useForm({
        defaultValues: { //Definimos los valores por defecto que tendra cada propiedad del formulario, para los campos opcionales.
            username: username ,
            email: email,
            country: country,
            city: userInfo.city || "",
            phone: userInfo.phone || "",
            gender: userInfo.gender || "",
            dateBirth: userInfo.dateBirth || "",
            address: userInfo.address || ""
        }
    });

    const navigate = useNavigate(); //Usamos navigate para navegar entre rutas.
    const [loading, setLoading] = useState(true); //Estado de carga para cuando este conectado con el backend
    const [cities, setCities] = useState([]); //Almacenamos las ciudades que vienen del backend.
    const [editProfile, setEditProfile] = useState(false); //Estado para permitir editar los campos del componente.
    const [success, setSuccess] = useState(false); //Estado que cambia si el formulario se envia correctamente.


    useEffect(() => { //Hook que contiene una función para comunicarnos con el backend y traer los paises.
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
        { id: "Masculino", name: "Masculino" },
        { id: "Femenino", name: "Femenino" },
        { id: "other", name: "No quiero especificar" }
    ];

    const submitProfile = async(formData) => { //Función que se llama cuando se envia el formulario.
        const {username, email, country, city, phone, address, gender, dateBirth} = formData; //Desestructuramos el objeto para acceder a cada propiedad interna del formulario.

        try {
            setSuccess(true); 

            const {data} = await api.put(`/users/${id}`, { //Mandamos los valores para actualziar el usuario.
                username, 
                email,
                country,
                city,
                phone, 
                address, 
                gender,
                dateBirth
            })

            setUser({ //Actualizamos ciertos campos del store.
                username: data?.username ?? username,
                country: data?.country ?? country,
                email: data?.email ?? email
            });

            setUserInfo(data.user); //Actualizamos cierta propiedad del store, enviandole todo el objeto. Este para el uso de los demás datos opcionales del usuario.
            toast.success( data.message || "Información Actualizada.", {position: "top-center"}); //Mensaje informativo.
            
            setTimeout(() => { //Hacemos una espera de 2 segundos y cambiamos la ruta.
                setEditProfile(!editProfile); //Habilitamos la opción para editar perfil.
                setSuccess(false);
                navigate("/perfil") //Navegamos a la ruta de perfil.
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message || "Error al actualizar usuario.", {position: "top-center"});
            setSuccess(false);
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
                    {success ? "Actualizando..." : "Guardar cambios"} {/*Si el formulario se envio exitosamente, se muestra el mensaje de guardando, sino, sigue en Guardar cambios. */}
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
