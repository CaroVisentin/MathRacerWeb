import type { LevelDto } from "../../domain/story-mode/levelDto";

export interface LevelDtoUi extends LevelDto {
    unlocked: boolean;
    completed: boolean;
    stars: number;
}
