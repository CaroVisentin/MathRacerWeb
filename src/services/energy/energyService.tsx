import type { EnergyStatusDto } from "../../models/domain/energy/energyStatusDto";
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
