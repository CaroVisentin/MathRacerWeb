import type { EnergyStatusDto } from "../../models/domain/energy/energyStatusDto";
import type { EnergyStoreInfoDto } from "../../models/domain/energy/energyStoreInfoDto";
import type { PurchaseEnergyResponseDto } from "../../models/domain/energy/purchaseEnergyResponseDto";
import { manageError } from "../../shared/utils/manageErrors";
import { api, API_URLS } from "../network/api";

/**
 * Obtiene el estado actual de energía del jugador autenticado
 */
export async function getEnergyStatus(): Promise<EnergyStatusDto> {
  try {
    const response = await api.get<EnergyStatusDto>(`${API_URLS.energy}`);
    return response.data;
  } catch (error: unknown) {
    manageError(error);
  }
}

export async function getEnergyStoreInfo(playerId: number): Promise<EnergyStoreInfoDto> {
  try {
    const response = await api.get<EnergyStoreInfoDto>(`${API_URLS.energy}/store/${playerId}`);
    return response.data;
  } catch (error: unknown) {
    manageError(error);
  }
}

export async function purchaseEnergy(playerId: number, quantity: number): Promise<PurchaseEnergyResponseDto> {
  try {
    const response = await api.post<PurchaseEnergyResponseDto>(`${API_URLS.energy}/purchase/${playerId}`,
      { quantity });
    return response.data;
  } catch (error: unknown) {
    manageError(error);
  }
}
