import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { BottomUI } from "../../../components/game/story-mode/bottomUI";
import { WorldMap } from "../../../components/game/story-mode/worldMap";
import { TopBar } from "../../../components/game/story-mode/topBar";
import { type PlayerWorldsResponseDto } from "../../../models/domain/story-mode/playerWorldsResponseDto";
import { getPlayerWorlds } from "../../../services/game/story-mode/worldService";
import { getWorldLevels } from "../../../services/game/story-mode/levelService";
import type { WorldDtoUi } from "../../../models/ui/story-mode/worldDtoUi";
import type { PlayerWildcardDto } from "../../../models/domain/player/playerWildcardDto";
import { getMyWildcards } from "../../../services/wildcard/wildcardService";
import type { WildcardQuantities } from "../../../models/ui/story-mode/wildcardQuantities";

export const StoryMode = () => {
  const [mappedWorlds, setMappedWorlds] = useState<WorldDtoUi[]>([]);
  const { player } = useAuth();

  const [wildcardQuantities, setWildcardQuantities] = useState<WildcardQuantities>({
    fireExtinguisher: 0,
    changeEquation: 0,
    doubleCount: 0,
  });

  useEffect(() => {
    async function fetchPlayerWorldsScreenInfo() {
      try {
        const playerWorldsResponse: PlayerWorldsResponseDto = await getPlayerWorlds();

        const enrichedWorlds: WorldDtoUi[] = await Promise.all(
          playerWorldsResponse.worlds.map(async (world) => {
            let completedLevels = 0;
            let totalLevels = 0;

            if (world.id <= playerWorldsResponse.lastAvailableWorldId) {
              const worldLevelsResponse = await getWorldLevels(world.id);

              const levelList = worldLevelsResponse.levels;

              totalLevels = levelList.length;
              completedLevels = levelList.filter((level) => level.isCompleted).length;
            }

            const completed = totalLevels > 0 && completedLevels === totalLevels;

            return {
              ...world,
              unlocked: world.id <= playerWorldsResponse.lastAvailableWorldId,
              completedLevels,
              totalLevels,
              completed,
            };
          })
        );

        // Desbloquear el siguiente mundo si el anterior está completo
        for (let i = 0; i < enrichedWorlds.length - 1; i++) {
          if (enrichedWorlds[i].completed) {
            enrichedWorlds[i + 1].unlocked = true;
          }
        }

        setMappedWorlds(enrichedWorlds);

        const playerWildcardsResponse: PlayerWildcardDto[] = await getMyWildcards();

        const wildcards: WildcardQuantities = {
          fireExtinguisher:
            playerWildcardsResponse.find((w) => w.wildcardId === 1)?.quantity ||
            0, // Matafuego
          changeEquation:
            playerWildcardsResponse.find((w) => w.wildcardId === 2)?.quantity ||
            0, // Cambio de pregunta
          doubleCount:
            playerWildcardsResponse.find((w) => w.wildcardId === 3)?.quantity ||
            0, // Nitro
        };

        setWildcardQuantities(wildcards);
      } catch (error: unknown) {
        console.error("Error cargando mundos y niveles:", error);
      }
    }

    if (player) {
      fetchPlayerWorldsScreenInfo();
    }
  }, [player]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">
      <TopBar headerText="Mundos" remainingLives={7} />

      {mappedWorlds.length > 0 && <WorldMap mappedWorlds={mappedWorlds} />}

      <div className="p-4">
        <BottomUI
          fireExtinguisherQuant={wildcardQuantities.fireExtinguisher}
          changeEquationQuant={wildcardQuantities.changeEquation}
          dobleCountQuant={wildcardQuantities.doubleCount}
        />
      </div>
    </div>
  );
};

