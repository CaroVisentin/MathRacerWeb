import type { PowerUpType } from "../../models/enums/powerUpType";
import { api, API_URLS } from "../network/api";

export const gameService = {
  crearPartida: async (jugadorId: string) => {
    const res = await api.post(`${API_URLS.games}/`, { playerName: jugadorId });
    return res.data;
  },

  unirsePartida: async (partidaId: string, jugadorId: string) => {
    const res = await api.post(`${API_URLS.games}/${partidaId}/join`, { playerId: jugadorId });
    return res.data;
  },

  obtenerEcuacion: async (partidaId: string, jugadorId: string) => {
    const res = await api.get(`${API_URLS.games}/${partidaId}/question`, {
      params: { playerId: jugadorId },
    });
    return res.data;
  },
};

export const responderEcuacion = async (partidaId: string, jugadorId: string, respuesta: number) => {
  const res = await api.post(`/${partidaId}/answer`, { playerId: jugadorId, answer: respuesta });
  return res.data;
};

export const usarPowerUp = async (
  partidaId: number,
  jugadorId: number,
  powerUpType: PowerUpType) => {
  const res = await api.post(`${API_URLS.games}/${partidaId}/powerup/use`, {
    gameId : partidaId,
    playerId : jugadorId,
    powerUpType : powerUpType
  });
  return res.data;
}