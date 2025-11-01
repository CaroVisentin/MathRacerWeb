import { TopBar } from "../../../../components/game/story-mode/topBar";
import { LevelsGrid } from "../../../../components/game/story-mode/levelsGrid";
import { BottomUI } from "../../../../components/game/story-mode/bottomUI";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWorldLevels } from "../../../../services/game/story-mode/levelService";
import type { PlayerWorldLevelsResponseDto } from "../../../../models/domain/playerWorldLevelsResponseDto";
import { mapOperations } from "../../../../models/mappers/operationMapper";
import { mapLevels } from "../../../../models/mappers/levelMapper";
import type { LevelDtoUi } from "../../../../models/ui/levelDtoUi";

export const LevelMap = () => {
    const { id } = useParams();
    const worldId = Number(id);
    const location = useLocation();
    const worldOperations: string[] = location.state?.worldOperations ?? []; 
    const [levels, setLevels] = useState<LevelDtoUi[]>([]);
    const [playerWorldLevels, setPlayerWorldLevels] = useState<PlayerWorldLevelsResponseDto>();

    useEffect(() => {
        async function fetchLevels() {
            // setLoading(true);
            try {
                const playerWorldLevelsResponse: PlayerWorldLevelsResponseDto = await getWorldLevels(worldId);
                setPlayerWorldLevels(playerWorldLevelsResponse);

                const mappedLevels = mapLevels(playerWorldLevelsResponse.levels, playerWorldLevelsResponse.lastCompletedLevelId);
                setLevels(mappedLevels);
            } catch (error) {
                console.error("Error fetching levels:", error);
            } finally {
                // setLoading(false);
            }
        }

        fetchLevels();
    }, [worldId]);

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">
            <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute left-[5%] top-[10%] h-32 w-24 -skew-y-12 transform bg-gradient-to-b from-purple-900/50 to-purple-700/30" />
                <div className="absolute left-[15%] top-[5%] h-40 w-20 skew-y-6 transform bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30" />
                <div className="absolute right-[10%] top-[8%] h-48 w-28 -skew-y-6 transform bg-gradient-to-b from-purple-900/50 to-purple-700/30" />
                <div className="absolute right-[25%] top-[12%] h-36 w-22 skew-y-12 transform bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30" />
            </div>

            <TopBar headerText={playerWorldLevels?.worldName || ""} remainingLives={7} />

            <div className="flex-1 overflow-auto">
                <LevelsGrid levels={levels} />
            </div>

            {/* Bottom UI - Fixed */}
            <div className="p-4 sticky bottom-0 z-20">
                <BottomUI operations={mapOperations(worldOperations)} fireExtinguisherQuant={2} changeEquationQuant={3} dobleCountQuant={4} />
            </div>
        </div>
    )
}