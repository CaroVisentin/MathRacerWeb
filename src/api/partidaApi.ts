import axios from "axios";


const baseURL = import.meta.env.MODE === 'development'
? import.meta.env.VITE_API_URL_LOCAL
: import.meta.env.VITE_API_URL_PROD;

console.log("API baseURL:", baseURL);

// crear la instancia

const api = axios.create({
    baseURL : `${baseURL}/api/games`,
});

export const crearPartida = async(jugadorId : string) =>{
    const res = await api.post("/",{ playerName :jugadorId});
    return res.data;
};

export const unirsePartida = async( partidaId : string, 
    jugadorId: string) => {
        const res = await api.post(`/${partidaId}/join`,{playerId :jugadorId});
        return res.data;
    };

export const obtenerEcuacion = async (partidaId: string,jugadorId: string) => {
  const res = await api.get(`/${partidaId}/question`, { params: { playerId: jugadorId } });
  return res.data;
};


export const responderEcuacion = async (partidaId: string, jugadorId: string, respuesta: number) => {
  const res = await api.post(`/${partidaId}/answer`, { playerId: jugadorId, answer: respuesta });
  return res.data;
};




