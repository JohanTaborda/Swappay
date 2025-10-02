import { create } from "zustand";
import api from "../../service/axiosConfig";

//Estado global para manejar la información del usuario en toda la aplicación
export const useUserStore = create((set) => ({
    username: null,
    rol: null,
    country: null,
    email: null,
    isVerified: false,  

    setUser: (user) => set(user), //Función para actualizar datos del usuario  

    logout: async() => { //Cierra la sesión del usuario.
        try {
            await api.post('/auth/logout');
        
            set({username: null, rol: null, country: null, email: null, isVerified: false});

        } catch (error) {
            console.error("Error al cerrar sesión", error)
        }
    },

    initializeUser: async ()=> { //Verifica el token y actualiza estado
        try {
            const {data} = await api.post('/verification/verificationToken')

            set({username: data.username, rol: data.rol, country: data.country, email: data.email, isVerified: true})

        } catch (error) {

            set({username: null, rol: null, country: null, email:null, isVerified: false})
        }
    }
}))