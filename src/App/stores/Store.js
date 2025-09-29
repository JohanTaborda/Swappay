import { create } from "zustand";
import api from "../../service/axiosConfig";

//Estado global para manejar la información del usuario en toda la aplicación
export const useUserStore = create((set) => ({
    username: null,
    rol: null,
    country: null,
    isVerified: false,  

    setUser: (user) => set(user), //Función para actualizar datos del usuario  

    initializeUser: async ()=> { //Verifica el token y actualiza estado
        try {
            const {data} = await api.post('/verification/verificationToken')
            set({
                username: data.username,
                rol: data.rol,
                country: data.country,
                isVerified: true 
            })
        } catch (error) {
            set({
                username: null,
                rol: null,
                country: null,
                isVerified: false 
            })
            
        }
    }
}))