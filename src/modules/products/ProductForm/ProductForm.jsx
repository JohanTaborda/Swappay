import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MenuItem, Select, FormControl, InputLabel, TextField, Button, Typography } from "@mui/material";
import "./ProductForm.css";

//Listas de opciones para el formulario
const categories = [ "Hogar", "Juguetes", "Libros", "Ropa", "Tecnología", "Deportes", "Entretenimiento"];
const conditions = [ "Nuevo", "Reacondicionado", "Usado"];
const delivery = [ "Envío", "Digital"];

export default function ProductForm({ open = false, onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm(); //Hook para manejo de formulario
    const [preview1, setPreview1] = useState(null);     //Estado para previsualización de imágenes
    const [preview2, setPreview2] = useState(null);

    //Función al enviar formulario
    const onSubmit = (data) => {
        console.log(data);
        if (onClose) onClose();
    };

    if (!open) return null;     //Si el modal está cerrado, no renderiza nada

    //Rrevisualizar imagen 1
    const handleImageChange1 = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview1(reader.result); //Guarda la URL de la imagen
            reader.readAsDataURL(file);
        } else {
            setPreview1(null);
        }
    };

    //Previsualizar imagen 2
    const handleImageChange2 = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview2(reader.result); //Guarda la URL de la imagen
            reader.readAsDataURL(file);
        } else {
            setPreview2(null);
        }
    };

    return (
        <div className="product-modal-overlay">
            <div className="product-modal-content">
                <h2>Producto</h2>
                <div className="form-title">Publica tu producto para intercambiar</div>
                <button className="product-modal-close" onClick={onClose} aria-label="Cerrar">&times;</button> {/*Botón para cerrar el modal*/}
                <form className="formProduct" onSubmit={handleSubmit(onSubmit)}> {/* Formulario principal */}
                <div className="title">  {/*Input para el nombre del producto con validación obligatoria*/}
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

                <div className="category"> {/*Select para elegir la categoría del producto*/}
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

                <div className="interests">
                    <TextField
                        label="¿Qué aceptarias por el producto?"
                        type="text"
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

                <div className="imagen1"> {/*Botón para subir imagen 1 con previsualización*/}
                    {preview1 && (
                        <img src={preview1} alt="Previsualización 1" className="imagen1-preview" />
                    )}
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

                <div className="imagen2">
                    {preview2 && (
                        <img src={preview2} alt="Previsualización 2" className="imagen2-preview" />
                    )}
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
                            {...register("imagen2", { required: true })}
                            onChange={e => {
                                handleImageChange2(e);
                                register("imagen2").onChange(e);
                            }}
                        />
                    </Button>
                    {errors.imagen2 && <Typography variant="caption" color="error">Este campo es obligatorio</Typography>}
                </div>

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, fontWeight: 'bold' }}>
                    Publicar Producto
                </Button> 
            </form>
        </div>
    </div>
    );
}

