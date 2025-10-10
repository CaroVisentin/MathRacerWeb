"use client"

import { useState } from "react"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Comodines } from "../../../shared/comodines/comodines"
import { BackButton } from "../../../shared/buttons/backButton"
import { ButtonReglas } from "../../../shared/buttons/buttonReglas"

interface Level {
    id: number
    position: { x: number; y: number }
    unlocked: boolean
    completed: boolean
    stars: number
    type: "cyan" | "magenta"
}

export default function LevelSelection() {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

    // Define 15 levels with positions along the path
    const levels: Level[] = [
        { id: 1, position: { x: 15, y: 75 }, unlocked: true, completed: true, stars: 3, type: "cyan" },
        { id: 2, position: { x: 25, y: 65 }, unlocked: true, completed: true, stars: 3, type: "magenta" },
        { id: 3, position: { x: 35, y: 55 }, unlocked: true, completed: true, stars: 2, type: "cyan" },
        { id: 4, position: { x: 45, y: 48 }, unlocked: true, completed: true, stars: 3, type: "magenta" },
        { id: 5, position: { x: 55, y: 45 }, unlocked: true, completed: true, stars: 1, type: "cyan" },
        { id: 6, position: { x: 65, y: 48 }, unlocked: true, completed: false, stars: 0, type: "cyan" },
        { id: 7, position: { x: 73, y: 35 }, unlocked: true, completed: false, stars: 0, type: "magenta" },
        { id: 8, position: { x: 80, y: 28 }, unlocked: false, completed: false, stars: 0, type: "cyan" },
        { id: 9, position: { x: 85, y: 38 }, unlocked: false, completed: false, stars: 0, type: "magenta" },
        { id: 10, position: { x: 88, y: 50 }, unlocked: false, completed: false, stars: 0, type: "cyan" },
        { id: 11, position: { x: 85, y: 62 }, unlocked: false, completed: false, stars: 0, type: "magenta" },
        { id: 12, position: { x: 78, y: 72 }, unlocked: false, completed: false, stars: 0, type: "cyan" },
        { id: 13, position: { x: 68, y: 78 }, unlocked: false, completed: false, stars: 0, type: "magenta" },
        { id: 14, position: { x: 55, y: 80 }, unlocked: false, completed: false, stars: 0, type: "cyan" },
        { id: 15, position: { x: 42, y: 75 }, unlocked: false, completed: false, stars: 0, type: "magenta" },
    ]

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">
            {/* Background buildings pattern - o reemplazar por fondo */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-[5%] top-[10%] h-32 w-24 bg-gradient-to-b from-purple-900/50 to-purple-700/30 transform skew-y-12" />
                <div className="absolute left-[15%] top-[5%] h-40 w-20 bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30 transform -skew-y-6" />
                <div className="absolute right-[10%] top-[8%] h-48 w-28 bg-gradient-to-b from-purple-900/50 to-purple-700/30 transform skew-y-6" />
                <div className="absolute right-[25%] top-[12%] h-36 w-22 bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30 transform -skew-y-12" />
                <div className="absolute left-[8%] bottom-[15%] h-44 w-26 bg-gradient-to-b from-purple-900/50 to-purple-700/30 transform skew-y-6" />
                <div className="absolute right-[12%] bottom-[10%] h-40 w-24 bg-gradient-to-b from-fuchsia-900/50 to-fuchsia-700/30 transform -skew-y-6" />
            </div>

            {/* Top bar */}
            <div className="relative z-20 flex items-center justify-between p-4">
                <BackButton />

                {/* World title */}
                <div className="relative z-20 mx-auto mt-2 w-fit">
                    <div className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-8 py-3 backdrop-blur-sm">
                        {/* Pasarle el mundo mediante props */}
                        <h1 className="font-audiowide text-2xl font-bold tracking-wider text-cyan-300">Mundo 1</h1>
                    </div>
                </div>

                {/* Vidas que vendrían junto con el usuario en props */}
                <div className="flex items-center gap-1">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`h-6 w-3 rounded-sm ${i < 7 ? "bg-yellow-400 glow-yellow" : "bg-gray-700/50"}`} />
                    ))}
                </div>
            </div>

            {/* Main level path container */}
            <div className="relative z-10 mx-auto mt-8 h-[calc(100vh-280px)] w-[90%] max-w-5xl">
                {/* SVG Path */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main curved path */}
                    <path
                        d="M 10 80 Q 30 60, 50 45 T 75 30 Q 85 35, 90 50 Q 92 65, 85 75 Q 70 82, 50 82 Q 35 78, 25 70"
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="0.8"
                        filter="url(#glow)"
                        opacity="0.9"
                    />

                    {/* Additional glow layer */}
                    <path
                        d="M 10 80 Q 30 60, 50 45 T 75 30 Q 85 35, 90 50 Q 92 65, 85 75 Q 70 82, 50 82 Q 35 78, 25 70"
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="2"
                        opacity="0.3"
                        filter="url(#glow)"
                    />
                </svg>

                {/* Level nodes */}
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => level.unlocked && setSelectedLevel(level.id)}
                        disabled={!level.unlocked}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed"
                        style={{
                            left: `${level.position.x}%`,
                            top: `${level.position.y}%`,
                        }}
                    >
                        <div
                            className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 font-bold text-2xl transition-all ${level.unlocked
                                ? level.type === "cyan"
                                    ? "border-cyan-400 bg-cyan-500 text-white glow-cyan hover:bg-cyan-400"
                                    : "border-fuchsia-400 bg-fuchsia-500 text-white glow-magenta hover:bg-fuchsia-400"
                                : "border-gray-600 bg-gray-700 text-gray-400"
                                }`}
                        >
                            {level.unlocked ? level.id : <FontAwesomeIcon icon={faLock} className="h-6 w-6" />}

                            {/* Stars indicator */}
                            {level.completed && level.stars > 0 && (
                                <div className="absolute -bottom-2 flex gap-0.5">
                                    {[...Array(level.stars)].map((_, i) => (
                                        <div key={i} className="h-2 w-2 rounded-full bg-yellow-400 glow-yellow" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Bottom UI */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="mx-auto flex items-center gap-4 justify-between">
                    {/* Comodines - vienen con el usuario mediante props */}
                    <div className="flex flex-1 justify-start">
                        <Comodines matafuego={2} sync={3} thunder={4} />
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-1 justify-center">
                        <div className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-6 py-3 backdrop-blur-sm text-center">
                            <p className="font-jersey text-xl text-cyan-300">
                                Operaciones de suma y resta
                            </p>
                        </div>
                    </div>

                    {/* Botón de reglas */}
                    <div className="flex flex-1 justify-end">
                        <ButtonReglas />
                    </div>
                </div>
            </div>
        </div>
    )
}
