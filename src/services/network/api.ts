// Configuración del cliente HTTP (axios/fetch)

import axios from "axios";

// Detectar entorno
const baseURL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_API_URL_LOCAL
        : import.meta.env.VITE_API_URL_PROD;

// Exportar instancia base de axios
export const api = axios.create({
    baseURL: `${baseURL}/api`,
});

// Exportar los endpoints organizados por módulo
export const API_URLS = {
    games: "/games",
};
