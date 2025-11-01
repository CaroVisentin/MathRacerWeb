import type { LevelDto } from "./levelDto";

export interface PlayerWorldLevelsResponseDto {
    worldName: string;
    levels: LevelDto[];
    lastCompletedLevelId: number;
}