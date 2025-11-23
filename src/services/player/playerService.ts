import { api } from "../network/api";
import type { Player } from "../../models/ui/player/player";

/**
 * Servicio para obtener y actualizar datos del jugador
 */

/**
 * Obtiene los datos actualizados del jugador desde el backend
 * @param playerId ID del jugador
 * @returns Datos actualizados del jugador
 */
export async function getPlayerData(playerId: number): Promise<Player> {
  try {
    const { data } = await api.get(`/player/${playerId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener datos del jugador:", error);
    throw error;
  }
}

/**
 * Actualiza las monedas del jugador en el contexto
 */
export async function refreshPlayerCoins(playerId: number): Promise<number> {
  try {
    const player = await getPlayerData(playerId);
    return player.coins;
  } catch (error) {
    console.error("Error al actualizar monedas:", error);
    throw error;
  }
}

/**
 * Elimina la cuenta del jugador autenticado
 * Realiza una baja lógica en el backend
 */
export async function deleteAccount(): Promise<void> {
  try {
    await api.delete("/player/delete");
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
    throw error;
  }
}
