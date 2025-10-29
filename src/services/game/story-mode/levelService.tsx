import type { PlayerWorldLevelsResponseDto } from "../../../models/domain/playerWorldLevelsResponseDto";
import { api, API_URLS } from "../../network/api";

/**
 * Obtiene los niveles de un mundo específico y el progreso del jugador
 */
export async function getWorldLevels(worldId: number, playerId: number): Promise<PlayerWorldLevelsResponseDto> {
    try {
        const response = await api.get<PlayerWorldLevelsResponseDto>(
            `${API_URLS.worlds}/world/${worldId}/player/${playerId}`
        );

        return response.data;
    } catch (error: any) {
        console.error("Error al obtener los niveles del mundo:", error);
        throw error;
    }
}