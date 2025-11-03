// Configuración del cliente HTTP (axios/fetch)
import axios from "axios";
import { getAuth } from "firebase/auth";

// Detectar entorno
const baseURL = import.meta.env.VITE_API_URL;

// Validar que la URL base esté definida
if (!baseURL) {
    throw new Error('API URL no configurada. Verifica las variables de entorno.');
}

// Exportar instancia base de axios
export const api = axios.create({
    baseURL: `${baseURL}/api`,
});

// Interceptor para añadir el token a las peticiones
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};


export const getAuthToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        setAuthToken(token);
    }
}

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token inválido o expirado
            setAuthToken(null);
        }
        return Promise.reject(error);
    }
);

// Exportar los endpoints organizados por módulo
export const API_URLS = {
    games: "/games", 
    player: "/player",
    worlds: "/worlds",
    levels: "/levels",
    online: "/online",
    storyModeGame: "/solo",
    chest: "/chest"
};