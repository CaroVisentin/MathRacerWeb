import type { WorldDto } from "./worldDto";

export interface PlayerWorldsResponseDto {
    // Lista de todos los mundos disponibles en el juego
    worlds: WorldDto[];
    // ID del último mundo disponible/completado por el jugador
    lastAvailableWorldId: number;
}