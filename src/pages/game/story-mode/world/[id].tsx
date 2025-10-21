// Muestro el mapa de los niveles de cada mundo, pasándole el ID del mundo por url

import type { Level } from "../../../../models/ui/level";
import { TopBar } from "../../../../components/game/story-mode/topBar";
import { SvgPathLevels } from "../../../../components/game/story-mode/svgPathLevels";
import { BottomUI } from "../../../../components/game/story-mode/bottomUI";
import { worlds } from "../../../../components/game/story-mode/svgPathWorlds";
// import { useParams } from "react-router-dom";

export const LevelMap = () => {
    // const { id } = useParams();

    // Se obtiene la cantidad de niveles para el mundo en el que entró,
    // y último nivel completado del jugador
    const levels: Level[] = [
        { id: 1, unlocked: true, completed: true, stars: 3, worldId: 1, number: 1 },
        { id: 2, unlocked: true, completed: true, stars: 3, worldId: 1, number: 2 },
        { id: 3, unlocked: true, completed: true, stars: 3, worldId: 1, number: 3 },
        { id: 4, unlocked: true, completed: true, stars: 3, worldId: 1, number: 4 },
        { id: 5, unlocked: true, completed: true, stars: 3, worldId: 1, number: 5 },
        { id: 6, unlocked: true, completed: true, stars: 3, worldId: 1, number: 6 },
        { id: 7, unlocked: true, completed: true, stars: 3, worldId: 1, number: 7 },
        { id: 8, unlocked: true, completed: true, stars: 3, worldId: 1, number: 8 },
        { id: 9, unlocked: true, completed: true, stars: 3, worldId: 1, number: 9 },
        { id: 10, unlocked: true, completed: true, stars: 3, worldId: 1, number: 10 },
        { id: 11, unlocked: true, completed: false, stars: 0, worldId: 1, number: 11 },
        { id: 12, unlocked: false, completed: false, stars: 0, worldId: 1, number: 12 },
        { id: 13, unlocked: false, completed: false, stars: 0, worldId: 1, number: 13 },
        { id: 14, unlocked: false, completed: false, stars: 0, worldId: 1, number: 14 },
        { id: 15, unlocked: false, completed: false, stars: 0, worldId: 1, number: 15 },
    ];

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">
            {/* Background buildings pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute left-[5%] top-[10%] h-32 w-24 -skew-y-12 transform bg-gradient-to-b from-purple-900/50 to-purple-700/30" />
                <div className="absolute left-[15%] top-[5%] h-40 w-20 skew-y-6 transform bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30" />
                <div className="absolute right-[10%] top-[8%] h-48 w-28 -skew-y-6 transform bg-gradient-to-b from-purple-900/50 to-purple-700/30" />
                <div className="absolute right-[25%] top-[12%] h-36 w-22 skew-y-12 transform bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30" />
            </div>

            {/* Top bar - Fixed */}
            {/* Pasarle el mundo y las vidas restantes del jugador (sacar de un context) */}
            <TopBar headerText="Mundo 1" remainingLives={7} />

            {/* Pasarle los niveles por props */}
            <div className="flex-1 overflow-auto">
                <SvgPathLevels levels={levels} />
            </div>

            {/* Bottom UI - Fixed */}
            {/* Pasarle la cantidad de cada comodín del jugador por props */}
            <div className="p-4 sticky bottom-0 z-20">
                <BottomUI world={worlds[0]} fireExtinguisherQuant={2} changeEquationQuant={3} dobleCountQuant={4} />
            </div>
        </div>
    )
}