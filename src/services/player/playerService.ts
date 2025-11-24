import { api } from "../network/api";
import type { Player, PlayerItem } from "../../models/ui/player/player";

/**
 * Servicio para obtener y actualizar datos del jugador
 */

type BackendPlayer = {
  id?: number;
  name?: string;
  email?: string;
  lastlevelId?: number;
  points?: number;
  coins?: number;
  background?: PlayerItem | null;
  car?: PlayerItem | null;
  character?: PlayerItem | null;
  equippedBackground?: PlayerItem | null;
  equippedCar?: PlayerItem | null;
  equippedCharacter?: PlayerItem | null;
};

function mapToUiPlayer(data: BackendPlayer): Player {
  return {
    id: data?.id ?? 0,
    name: data?.name ?? "",
    email: data?.email ?? "",
    lastlevelId: data?.lastlevelId ?? 0,
    points: data?.points ?? 0,
    coins: data?.coins ?? 0,
    background: data?.background ?? data?.equippedBackground ?? null,
    car: data?.car ?? data?.equippedCar ?? null,
    character: data?.character ?? data?.equippedCharacter ?? null,
    equippedBackground: data?.equippedBackground ?? data?.background ?? null,
    equippedCar: data?.equippedCar ?? data?.car ?? null,
    equippedCharacter: data?.equippedCharacter ?? data?.character ?? null,
  };
}

/**
 * Obtiene los datos actualizados del jugador desde el backend
 * @param playerId ID del jugador
 * @returns Datos actualizados del jugador
 */
export async function getPlayerData(playerId: number): Promise<Player> {
  try {
    // Intentar con endpoint en plural (consistente con otros endpoints del módulo)
    const { data } = await api.get<BackendPlayer>(`/players/${playerId}`);
    return mapToUiPlayer(data);
  } catch (errPlural: unknown) {
    // Log sólo para desarrollo; ya que haremos fallback
    if (import.meta.env.DEV) {
      console.debug("Fallo /players/{id}, intentando /player/{id}", errPlural);
    }
    try {
      const { data } = await api.get<BackendPlayer>(`/player/${playerId}`);
      return mapToUiPlayer(data);
    } catch (error) {
      console.error("Error al obtener datos del jugador (fallback singular):", error);
      throw error;
    }
  }
}

/**
 * Obtiene los datos del jugador por email (respaldo útil cuando el ID no está disponible)
 */
export async function getPlayerDataByEmail(email: string): Promise<Player> {
  try {
    const { data } = await api.get<BackendPlayer>(`/player/email/${encodeURIComponent(email)}`);
    return mapToUiPlayer(data);
  } catch (error) {
    console.error("Error al obtener jugador por email:", error);
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
