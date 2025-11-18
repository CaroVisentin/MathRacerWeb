import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ConfirmModal from "../../../shared/modals/confirmModal";

export const StoryMode = () => {
  const [mappedWorlds, setMappedWorlds] = useState<WorldDtoUi[]>([]);
  const navigate = useNavigate();
  const { player } = useAuth();
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const [wildcardQuantities, setWildcardQuantities] =
    useState<WildcardQuantities>({
      fireExtinguisher: 0,
      changeEquation: 0,
      doubleCount: 0,
    });

  // Verificar si el jugador completó el tutorial antes de cargar el modo historia
  useEffect(() => {
    if (player && player.lastlevelId === 0) {
      console.log("Usuario sin tutorial detectado (lastlevelId: 0), mostrando modal...");
      setShowTutorialModal(true);
      return;
    }
  }, [player]);

  useEffect(() => {
    async function fetchPlayerWorldsScreenInfo() {
      try {
        const playerWorldsResponse: PlayerWorldsResponseDto =
          await getPlayerWorlds();

        const enrichedWorlds: WorldDtoUi[] = await Promise.all(
          playerWorldsResponse.worlds.map(async (world) => {
            let completedLevels = 0;

            // Solo traemos niveles si el mundo está desbloqueado
            if (world.id <= playerWorldsResponse.lastAvailableWorldId) {
              const worldLevelsResponse = await getWorldLevels(world.id);
              completedLevels = worldLevelsResponse.lastCompletedLevelId || 0;
            }

            const completed = completedLevels >= 15;

            return {
              ...world,
              unlocked: world.id <= playerWorldsResponse.lastAvailableWorldId,
              completedLevels,
              totalLevels: 15,
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

        const playerWildcardsResponse: PlayerWildcardDto[] =
          await getMyWildcards();

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

        // Ya no verificamos wildcards aquí, usamos lastlevelId del player
      } catch (error: unknown) {
        console.error("Error cargando mundos y niveles:", error);
      }
    }

    // Solo cargar si el jugador completó el tutorial
    if (player && player.lastlevelId > 0) {
      fetchPlayerWorldsScreenInfo();
    }
  }, [player]);

  return (
    <>
      {showTutorialModal && (
        <ConfirmModal
          title="Tutorial requerido"
          message="Para jugar al modo historia necesitás completar el tutorial primero y obtener tus comodines iniciales."
          confirmText="Ir al tutorial"
          cancelText="Volver"
          onConfirm={() => navigate('/tutorial')}
          onCancel={() => navigate('/home')}
        />
      )}

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
    </>
  );
};
