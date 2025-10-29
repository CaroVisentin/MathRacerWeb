import type { PlayerWorldsResponseDto } from "../../../models/domain/playerWorldsResponseDto";
import { api, API_URLS } from "../../network/api";

/**
* Obtiene todos los mundos del juego y el progreso del jugador
*/
export async function getPlayerWorlds(playerId: number): Promise<PlayerWorldsResponseDto> {
    try {
        const response = await api.get<PlayerWorldsResponseDto>(
            `${API_URLS.worlds}/player/${playerId}`
        );

        console.log("Respuesta: ", response)

        return response.data;

    } catch (error: any) {
        console.error("Error al obtener los mundos del jugador:", error);
        throw error;
    }
}