// Muestro el mapa de los niveles de cada mundo, pasándole el ID del mundo por url

import { useRef, useState, useEffect } from "react";
import type { Level } from "../../../../models/ui/level";
import { TopBar } from "../../../../components/game/story-mode/topBar";
import { SvgPathLevels } from "../../../../components/game/story-mode/svgPathLevels";
import { BottomUI } from "../../../../components/game/story-mode/bottomUI";
import { useParams } from "react-router-dom";

export const LevelMap = () => {
    const pathRef = useRef<SVGPathElement>(null)
    const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>([])
    console.log("Llegó a levelmap")

    const { id } = useParams();
    console.log("ID desde URL: ", id)

    // Se obtiene la cantidad de niveles para el mundo en el que entró,
    // y último nivel completado del jugador
    const levels: Level[] = [
        { id: 1, worldId: 1, number: 1 },
        { id: 2, worldId: 1, number: 2 },
        { id: 3, worldId: 1, number: 3 },
        { id: 4, worldId: 1, number: 4 },
        { id: 5, worldId: 1, number: 5 },
        { id: 6, worldId: 1, number: 6 },
        { id: 7, worldId: 1, number: 7 },
        { id: 8, worldId: 1, number: 8 },
        { id: 9, worldId: 1, number: 9 },
        { id: 10, worldId: 1, number: 10 },
        { id: 11, worldId: 1, number: 11 },
        { id: 12, worldId: 1, number: 12 },
        { id: 13, worldId: 1, number: 13 },
        { id: 14, worldId: 1, number: 14 },
        { id: 15, worldId: 1, number: 15 },
    ];

    useEffect(() => {
        if (pathRef.current) {
            const path = pathRef.current
            const length = path.getTotalLength()
            const positions = levels.map((_, i) => {
                const point = path.getPointAtLength((length / (levels.length - 1)) * i)
                return { x: point.x, y: point.y }
            })
            setNodePositions(positions)
        }
    }, [levels])

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
            <SvgPathLevels levels={levels} nodePositions={nodePositions} pathRef={pathRef} className="flex-1"/>

            {/* Bottom UI - Fixed */}
            {/* Pasarle la cantidad de cada comodín del jugador por props */}
            <div className="p-4">
                <BottomUI fireExtinguisherQuant={2} changeEquationQuant={3} dobleCountQuant={4} />
            </div>
        </div>
    )
}