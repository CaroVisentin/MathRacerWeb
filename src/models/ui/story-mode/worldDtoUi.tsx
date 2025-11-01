import type { WorldDto } from "../../domain/story-mode/worldDto";

/*
* Interfaz utilizada en el modo historia para guardar datos calculados
*/
export interface WorldDtoUi extends WorldDto {
    unlocked: boolean;
    completedLevels: number;
    completed: boolean;
    totalLevels: number;
}

