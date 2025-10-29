import type { LevelDto } from "../domain/levelDto";

export interface LevelDtoUi extends LevelDto {
    unlocked: boolean;
    completed: boolean;
    stars: number;
}
