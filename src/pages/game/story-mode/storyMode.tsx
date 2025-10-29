import { useEffect, useState } from "react"
import { BottomUI } from "../../../components/game/story-mode/bottomUI"
import { WorldMap } from "../../../components/game/story-mode/worldMap"
import { TopBar } from "../../../components/game/story-mode/topBar"
import { type PlayerWorldsResponseDto } from "../../../models/domain/playerWorldsResponseDto"
import { getPlayerWorlds } from "../../../services/game/story-mode/worldService"
import { getWorldLevels } from "../../../services/game/story-mode/levelService"
import type { WorldDtoUi } from "../../../models/ui/worldDtoUi"

export const StoryMode = () => {
    const playerId = 1;
    const [mappedWorlds, setMappedWorlds] = useState<WorldDtoUi[]>([]);

    useEffect(() => {
        async function fetchPlayerWorldsAndLevels() {
            try {
                // 1️⃣ Traigo los mundos del jugador
                const playerWorldsResponse: PlayerWorldsResponseDto = await getPlayerWorlds(playerId);

                // 2️⃣ Para cada mundo, traigo los niveles completados
                const enrichedWorlds: WorldDtoUi[] = await Promise.all(
                    playerWorldsResponse.worlds.map(async (world) => {
                        let completedLevels = 0;

                        // Solo traemos niveles si el mundo está desbloqueado
                        if (world.id <= playerWorldsResponse.lastAvailableWorldId) {
                            const worldLevelsResponse = await getWorldLevels(world.id, playerId);
                            completedLevels = worldLevelsResponse.lastCompletedLevelId || 0;
                        }

                        return {
                            ...world,
                            unlocked: world.id <= playerWorldsResponse.lastAvailableWorldId,
                            completedLevels,
                            totalLevels: 15, // total por mundo
                            completed: completedLevels >= 15,
                        };
                    })
                );

                setMappedWorlds(enrichedWorlds);

            } catch (error: any) {
                console.error("Error cargando mundos y niveles:", error);
            }
        }

        fetchPlayerWorldsAndLevels();
    }, []);

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">
            <TopBar headerText="Mundos" remainingLives={7} />

            {mappedWorlds.length > 0 && <WorldMap mappedWorlds={mappedWorlds} />}

            <div className="p-4">
                <BottomUI fireExtinguisherQuant={2} changeEquationQuant={3} dobleCountQuant={4} />
            </div>
        </div>
    );
}

