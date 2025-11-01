import type { LevelDto } from "../domain/levelDto";
import type { LevelDtoUi } from "../ui/levelDtoUi";

export function mapLevels(levelsFromApi: LevelDto[], lastCompletedLevel: number): LevelDtoUi[] {
    return levelsFromApi.map((level) => {
        const completed = level.id <= lastCompletedLevel;
        const unlocked = level.id <= lastCompletedLevel + 1;

        // Lógica de estrellas — puede venir de otra fuente, pero acá es un ejemplo:
        const stars = completed ? Math.floor(Math.random() * 4) : 0; // 0 a 3 estrellas

        return {
            ...level,
            unlocked,
            completed,
            stars,
        };
    });
}
