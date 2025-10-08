import axios from "axios";
import { aP } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

const baseURL = import.meta.env.MODE === 'development'
? import.meta.env.VITE_API_URL_LOCAL
: import.meta.env.VITE_API_URL_PROD;

// crear la instancia

const api = axios.create({
    baseURL : `${baseURL}/api/partida`,
});

export const crearPartida = async(jugadorId : string) =>{
    const res = await api.post("/crear",{jugadorId});
    return res.data;
};

export const unirsePartida = async( partidaId : string, 
    jugadorId: string) => {
        const res = await api.post("/unirse",{partidaId,jugadorId});
        return res.data;
    };

export const obtenerEcuacion = async (partidaId: string) => {
  const res = await api.get(`/ecuacion/${partidaId}`);
  return res.data;
};


export const responderEcuacion = async (partidaId: string, respuesta: number) => {
  const res = await api.post("/responder", { partidaId, respuesta });
  return res.data;
};

