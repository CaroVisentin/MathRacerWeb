import type { PlayerWildcardDto } from "../../models/domain/player/playerWildcardDto";
import type { StoreWildcardDto } from "../../models/domain/store/storeWildcardDto";
import type { PurchaseWildcardResponseDto } from "../../models/domain/store/purchaseWildcardResponseDto";
import { manageError } from "../../shared/utils/manageErrors";
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

export async function getStoreWildcards(playerId: number): Promise<StoreWildcardDto[]> {
  try {
    const response = await api.get<StoreWildcardDto[]>(`${API_URLS.wildcards}/store/${playerId}`);
    return response.data;
  } catch (error: unknown) {
    manageError(error);
  }
}

export async function purchaseWildcard(playerId: number, wildcardId: number, quantity = 1): Promise<PurchaseWildcardResponseDto> {
  try {
    const response = await api.post<PurchaseWildcardResponseDto>(`${API_URLS.wildcards}/purchase/${playerId}`,
      {
        wildcardId,
        quantity,
      });
    return response.data;
  } catch (error: unknown) {
    manageError(error);
  }
}
