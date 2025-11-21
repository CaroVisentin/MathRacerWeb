import type { WorldDto } from "../domain/story-mode/worldDto";
import type { WorldDtoUi } from "../ui/story-mode/worldDtoUi";

/**
 * Mapear los mundos agregando info de desbloqueo y niveles completados
 * @param worlds Lista de mundos del backend
 * @param lastAvailableWorldId Id del último mundo desbloqueado por el jugador
 * @param levelsPerWorld Cantidad total de niveles por mundo
 */
export function mapWorlds(worlds: WorldDto[], lastAvailableWorldId: number, levelsPerWorld: number): WorldDtoUi[] {
    return worlds.map((world) => {
        let completedLevels = 0;

        if (world.id < lastAvailableWorldId) {
            completedLevels = levelsPerWorld; // mundos anteriores completos
        } else if (world.id === lastAvailableWorldId) {
            completedLevels = 0; // último desbloqueado, incompleto
        }

        return {
            ...world,
            unlocked: world.id <= lastAvailableWorldId,
            completedLevels,
            totalLevels: levelsPerWorld,
            completed: completedLevels >= levelsPerWorld,
        };
    });
}