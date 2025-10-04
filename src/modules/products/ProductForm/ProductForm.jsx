import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MenuItem, Select, FormControl, InputLabel, TextField, Button, Typography } from "@mui/material";
import "./ProductForm.css";

import api from "../../../service/axiosConfig";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { useUserStore } from "../../../App/stores/Store";

//Listas de opciones para el formulario
const categories = [ "Hogar", "Juguetes", "Libros", "Ropa", "Tecnología", "Deportes", "Entretenimiento"];
const conditions = [ "Nuevo", "Reacondicionado", "Usado"];
const delivery = [ "Envío", "Digital"];

export default function ProductForm({ open = false, onClose }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [preview1, setPreview1] = useState(null);     
    const [preview2, setPreview2] = useState(null);
    const [preview3, setPreview3] = useState(null); // Estado para la tercera imagen
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {id} = useUserStore();

    const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('idUser', id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('condition', data.condition);
    formData.append('amount', data.amount);
    formData.append('additionalNotes', data.additionalNotes);
    formData.append('ubication', data.ubication);
    formData.append('deliveryMethod', data.deliveryMethod);
    // Campo opcional de precio en swapcoins
    if (data.priceSwapcoins) formData.append('priceSwapcoins', data.priceSwapcoins);
    if (data.interests) formData.append('interests', data.interests);

    // Agregar imágenes solo si existen
    if (data.imagen1 && data.imagen1[0]) formData.append('image1', data.imagen1[0]);
    if (data.imagen2 && data.imagen2[0]) formData.append('image2', data.imagen2[0]);
    if (data.imagen3 && data.imagen3[0]) formData.append('image3', data.imagen3[0]);

        try {
            await api.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success("Publicación creada exitosamente.", {position: "top-center"}); //Mensaje informativo.
            setButtonDisabled(true);
            setTimeout(() => {
                if (onClose) onClose();
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.error, {position: "top-center"}); //Mensaje informativo.
        }
    };

    useEffect(() => {
        if (open) {
            reset();       
            setPreview1(null);
            setPreview2(null);
            setPreview3(null);
            setButtonDisabled(false);
        }
    }, [open, reset]);

    if (!open) return null;


    //Funciones para previsualizar imágenes
    const handleImageChange1 = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview1(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview1(null);
        }
    };

    const handleImageChange2 = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview2(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview2(null);
        }
    };

    const handleImageChange3 = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview3(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview3(null);
        }
    };

    return (
        <div className="product-modal-overlay">
            <div className="product-modal-content">
               <div className="product-modal-container">
                    <h2>Producto</h2>
                    <div className="form-title">Publica tu producto para intercambiar</div>
                    <button className="product-modal-close" onClick={onClose} aria-label="Cerrar">&times;</button>
                    <form className="formProduct" onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Nombre del producto */}
                        <div className="title">
                            <TextField 
                                label="Nombre del producto"
                                variant="outlined"
                                fullWidth
                                size="small"
                                minRows={2}
                                sx={{ mb: 1 }}
                                error={!!errors.title}
                                helperText={errors.title ? 'Este campo es obligatorio' : ''}
                                {...register("title", { required: true })}
                            />
                        </div>

                        {/* Descripción */}
                        <div className="description">
                            <TextField
                                label="Descripción del producto"
                                variant="outlined"
                                fullWidth
                                size="medium"
                                multiline
                                minRows={3}
                                sx={{ mb: 1 }}
                                error={!!errors.description}
                                helperText={errors.description ? 'Este campo es obligatorio' : ''}
                                {...register("description", { required: true })}
                            />
                        </div>

                        {/* Categoría */}
                        <div className="category">
                            <FormControl fullWidth size="small" sx={{ mb: 1 }} error={!!errors.category}>
                                <InputLabel id="category-label">Categoría</InputLabel>
                                <Select
                                    labelId="category-label"
                                    label="Categoría"
                                    defaultValue=""
                                    {...register("category", { required: true })}
                                >
                                    <MenuItem value=""><em>Selecciona una categoría</em></MenuItem>
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </Select>
                                {errors.category && <Typography variant="caption" color="error">Este campo es obligatorio</Typography>}
                            </FormControl>
                        </div>

                        {/* Condición */}
                        <div className="condition">
                            <FormControl fullWidth size="small" sx={{ mb: 1 }} error={!!errors.condition}>
                                <InputLabel id="condition-label">Condición</InputLabel>
                                <Select
                                    labelId="condition-label"
                                    label="Condición"
                                    defaultValue=""
                                    {...register("condition", { required: true })}
                                >
                                    {conditions.map((cond) => (
                                        <MenuItem key={cond} value={cond}>{cond}</MenuItem>
                                    ))}
                                </Select>
                                {errors.condition && <Typography variant="caption" color="error">Este campo es obligatorio</Typography>}
                            </FormControl>
                        </div>

                        {/* Cantidad */}
                        <div className="amount">
                            <TextField
                                label="Cantidad"
                                type="number"
                                variant="outlined"
                                fullWidth
                                size="small"
                                inputProps={{ min: 1 }}
                                sx={{ mb: 1 }}
                                error={!!errors.amount}
                                helperText={errors.amount ? 'Este campo es obligatorio' : ''}
                                {...register("amount", { required: true })}
                            />
                        </div>

                        {/* Intereses */}
                        <div className="interests">
                            <TextField
                                label="¿Qué aceptarias por el producto?"
                                variant="outlined"
                                fullWidth
                                size="small"
                                multiline
                                minRows={2}
                                sx={{ mb: 1 }}
                                helperText={errors.interests ? 'Este campo es obligatorio' : ''}
                                {...register("interests", { required: true })}
                            />
                        </div>

                        {/* Notas adicionales */}
                        <div className="additionalNotes">
                            <TextField
                                label="Notas adicionales"
                                variant="outlined"
                                fullWidth
                                size="small"
                                multiline
                                minRows={2}
                                sx={{ mb: 1 }}
                                error={!!errors.additionalNotes}
                                helperText={errors.additionalNotes ? 'Este campo es obligatorio' : ''}
                                {...register("additionalNotes", { required: true })}
                            />
                        </div>

                        {/* Ubicación */}
                        <div className="ubication">
                            <TextField
                                label="Ciudad/País"
                                variant="outlined"
                                fullWidth
                                size="small"
                                sx={{ mb: 1 }}
                                error={!!errors.ubication}
                                helperText={errors.ubication ? 'Este campo es obligatorio' : ''}
                                {...register("ubication", { required: true })}
                            />
                        </div>

                        {/* Método de entrega */}
                        <div className="deliveryMethod">
                            <FormControl fullWidth size="small" sx={{ mb: 1 }} error={!!errors.deliveryMethod}> 
                                <InputLabel id="deliveryMethod-label">Método de entrega</InputLabel> 
                                <Select 
                                    labelId="deliveryMethod-label" 
                                    label="Método de entrega" 
                                    defaultValue="" 
                                    {...register("deliveryMethod", { required: true })} 
                                > 
                                    <MenuItem value=""><em>Selecciona el método de entrega</em></MenuItem> 
                                    {delivery.map((shape) => ( 
                                        <MenuItem key={shape} value={shape}>{shape}</MenuItem> 
                                    ))} 
                                </Select> 
                                {errors.deliveryMethod && <Typography variant="caption" color="error">Este campo es obligatorio</Typography>} 
                            </FormControl>
                        </div>

                        {/* Precio en swapcoins (opcional) */}
                        <div className="swapcoins">
                            <TextField
                                label="Precio en swapcoins (opcional)"
                                type="text"
                                variant="outlined"
                                fullWidth
                                size="small"
                                inputProps={{ min: 0 }}
                                sx={{ mb: 1 }}
                                {...register("priceSwapcoins")}
                            />
                        </div>

                        {/* Imagen 1 */}
                        <div className="imagen1">
                            {preview1 && <img src={preview1} alt="Previsualización 1" className="imagen1-preview" />}
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ mb: 1 }}
                                color={errors.imagen1 ? "error" : "primary"}
                            >
                                Subir imagen 1
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    {...register("imagen1", { required: true })}
                                    onChange={e => {
                                        handleImageChange1(e);
                                        register("imagen1").onChange(e);
                                    }}
                                />
                            </Button>
                            {errors.imagen1 && <Typography variant="caption" color="error">Este campo es obligatorio</Typography>}
                        </div>

                        {/* Imagen 2 */}
                        <div className="imagen2">
                            {preview2 && <img src={preview2} alt="Previsualización 2" className="imagen2-preview" />}
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ mb: 1 }}
                                    color={errors.imagen2 ? "error" : "primary"}
                            >
                                Subir imagen 2
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                        {...register("imagen2")}
                                        onChange={e => {
                                            handleImageChange2(e);
                                            register("imagen2").onChange(e);
                                        }}
                                />
                            </Button>
                                {/* No mostrar error ya que es opcional */}
                        </div>

                        {/* Imagen 3 */}
                        <div className="imagen3">
                            {preview3 && <img src={preview3} alt="Previsualización 3" className="imagen3-preview" />}
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ mb: 1 }}
                                    color={errors.imagen3 ? "error" : "primary"}
                            >
                                Subir imagen 3
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                        {...register("imagen3")}
                                        onChange={e => {
                                            handleImageChange3(e);
                                            register("imagen3").onChange(e);
                                        }}
                                />
                            </Button>
                                {/* No mostrar error ya que es opcional */}
                        </div>

                        <Button type="submit" disabled={buttonDisabled} variant="contained" fullWidth sx={{ mt: 2, fontWeight: 'bold' }}>
                            Publicar Producto
                        </Button> 
                    </form>
               </div>
        </div>
        <div>
            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable/> {/*Paneles informativos de la aplicación.*/}
        </div>
    </div>
    );
}
