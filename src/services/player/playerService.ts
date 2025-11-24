import { api } from "../network/api";
import type { BackendPlayer, Player } from "../../models/ui/player/player";
import { auth } from "../network/firebase";
import { mapToUiPlayer } from "../../models/mappers/playerMapper";

/**
 * Obtiene los datos actualizados del jugador desde el backend
 * @param playerId ID del jugador
 * @returns Datos actualizados del jugador
 */
export async function getPlayerData(): Promise<Player> {
  try {
    const userUid = auth.currentUser?.uid;
    const { data } = await api.get<BackendPlayer>(`/player/${userUid}`);
    return mapToUiPlayer(data);
  } catch (error) {
    console.error("Error al obtener jugador por email:", error);
    throw error;
  }
}

/**
 * Actualiza las monedas del jugador en el contexto
 */
export async function refreshPlayerCoins(): Promise<number> {
  try {
    const player = await getPlayerData();
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
