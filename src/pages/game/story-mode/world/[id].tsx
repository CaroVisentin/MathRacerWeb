import { TopBar } from "../../../../components/game/story-mode/topBar";
import { LevelsGrid } from "../../../../components/game/story-mode/levelsGrid";
import { BottomUI } from "../../../../components/game/story-mode/bottomUI";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWorldLevels } from "../../../../services/game/story-mode/levelService";
import type { PlayerWorldLevelsResponseDto } from "../../../../models/domain/story-mode/playerWorldLevelsResponseDto";
import { mapOperations } from "../../../../models/mappers/operationMapper";
import { mapLevels } from "../../../../models/mappers/levelMapper";
import type { LevelDtoUi } from "../../../../models/ui/story-mode/levelDtoUi";
import { StarsBackground } from "../../../../components/game/story-mode/starsBackground";
import Spinner from "../../../../shared/spinners/spinner";

export const LevelMap = () => {
    const { id } = useParams();
    const worldId = Number(id);
    const location = useLocation();
    const worldOperations: string[] = location.state?.worldOperations ?? [];

    const [levels, setLevels] = useState<LevelDtoUi[]>([]);
    const [playerWorldLevels, setPlayerWorldLevels] = useState<PlayerWorldLevelsResponseDto>();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchLevels() {
            setIsLoading(true);
            try {
                const playerWorldLevelsResponse: PlayerWorldLevelsResponseDto = await getWorldLevels(worldId);
                setPlayerWorldLevels(playerWorldLevelsResponse);

                const mappedLevels = mapLevels(playerWorldLevelsResponse.levels, playerWorldLevelsResponse.lastCompletedLevelId);
                setLevels(mappedLevels);
            } catch (error) {
                console.error("Error fetching levels:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLevels();
    }, [worldId]);

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">

            {isLoading && <Spinner />}

            {/* Fondo de estrellas */}
            <StarsBackground />

            {/* Top br que contiene el nombre del mundo y las vidas del jugador */}
            <TopBar headerText={playerWorldLevels?.worldName || ""} remainingLives={7} />

            {/* Grilla de niveles */}
            <div className="flex-1 overflow-auto">
                <LevelsGrid levels={levels} />
            </div>

            {/* Bottom bar que contiene las operaciones y la cantidad de comodines */}
            <div className="p-4 sticky bottom-0 z-20">
                <BottomUI operations={mapOperations(worldOperations)} fireExtinguisherQuant={2} changeEquationQuant={3} dobleCountQuant={4} />
            </div>
        </div>
    )
}