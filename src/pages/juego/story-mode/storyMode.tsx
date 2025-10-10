"use client"
import { useEffect, useRef, useState } from "react"
import { BottomUI } from "../../../components/juego/story-mode/bottomUI"
import { TopBar } from "../../../components/juego/story-mode/topBar"
import { LevelMap } from "../../../components/juego/story-mode/svgPath"
import type { Level } from "../../../types/mode/story-mode/level"

export default function LevelSelection() {
    const pathRef = useRef<SVGPathElement>(null)
    const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>([])

    // Se obtiene la cantidad de niveles para el mundo en el que entró,
    // y último nivel completado del jugador
    const levels: Level[] = [
        { id: 1, mundoId: 1, numero: 1 },
        { id: 2, mundoId: 1, numero: 2 },
        { id: 3, mundoId: 1, numero: 3 },
        { id: 4, mundoId: 1, numero: 4 },
        { id: 5, mundoId: 1, numero: 5 },
        { id: 6, mundoId: 1, numero: 6 },
        { id: 7, mundoId: 1, numero: 7 },
        { id: 8, mundoId: 1, numero: 8 },
        { id: 9, mundoId: 1, numero: 9 },
        { id: 10, mundoId: 1, numero: 10 },
        { id: 11, mundoId: 1, numero: 11 },
        { id: 12, mundoId: 1, numero: 12 },
        { id: 13, mundoId: 1, numero: 13 },
        { id: 14, mundoId: 1, numero: 14 },
        { id: 15, mundoId: 1, numero: 15 },
        { id: 16, mundoId: 1, numero: 16 },
        { id: 17, mundoId: 1, numero: 17 },
        { id: 18, mundoId: 1, numero: 18 },
        { id: 19, mundoId: 1, numero: 19 },
        { id: 20, mundoId: 1, numero: 20 },
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
            <TopBar mundo="Mundo 1" vidasRestantes={7} />

            {/* Pasarle los niveles por props */}
            <LevelMap levels={levels} nodePositions={nodePositions} pathRef={pathRef} />

            {/* Bottom UI - Fixed */}
            {/* Pasarle la cantidad de cada comodín del jugador por props */}
            <div className="p-4">
                <BottomUI matafuegoCant={2} syncCant={3} thunderCant={4}/>
            </div>
        </div>
    )
}
