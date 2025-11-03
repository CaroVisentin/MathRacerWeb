import type { ChestItemDto } from "./chestItemDto";

// Respuesta al abrir un cofre
export interface ChestResponseDto {
    items: ChestItemDto[];
}