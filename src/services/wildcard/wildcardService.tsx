import type { PlayerWildcardDto } from "../../models/domain/player/playerWildcardDto";
import { api, API_URLS } from "../network/api";

/**
 * Obtiene la lista de wildcards (comodines) disponibles del jugador autenticado
 */
export async function getMyWildcards(): Promise<PlayerWildcardDto[]> {
  try {
    const response = await api.get<PlayerWildcardDto[]>(
      `${API_URLS.wildcards}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error al obtener los comodines del jugador:", error);
    throw error;
  }
}
