import { create } from "zustand";
import api from "../../service/axiosConfig";

export const useUserStore = create((set) => ({
    username: null,
    rol: null,
    country: null,
    isVerified: false,  

    setUser: (user) => set(user),

    initializeUser: async ()=> {
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