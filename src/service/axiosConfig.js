import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000", //URL DEL BACKEND
    withCredentials: true //Permitimos el manejo de credenciales.
})

export default api;