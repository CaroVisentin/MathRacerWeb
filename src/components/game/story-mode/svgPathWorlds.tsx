// Falta tipar bien el objeto WORLD y LEVEL.
// Mostrar, según el usuario, hasta el último mundo que desbloqueó

// MAPA DE MUNDOS DEL JUEGO

"use client"

import { faLock, faTrophy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface World {
    id: number
    name: string
    description: string
    totalLevels: number
    completedLevels: number
    stars: number
    totalStars: number
    unlocked: boolean
    completed: boolean
}

const worlds: World[] = [
    {
        id: 1,
        name: "Mundo 1",
        description: "Suma y Resta",
        totalLevels: 7,
        completedLevels: 4,
        stars: 12,
        totalStars: 21,
        unlocked: true,
        completed: false,
    },
    {
        id: 2,
        name: "Mundo 2",
        description: "Multiplicación",
        totalLevels: 8,
        completedLevels: 0,
        stars: 0,
        totalStars: 24,
        unlocked: true,
        completed: false,
    },
    {
        id: 3,
        name: "Mundo 3",
        description: "División",
        totalLevels: 8,
        completedLevels: 0,
        stars: 0,
        totalStars: 24,
        unlocked: false,
        completed: false,
    },
    {
        id: 4,
        name: "Mundo 4",
        description: "Operaciones Mixtas",
        totalLevels: 10,
        completedLevels: 0,
        stars: 0,
        totalStars: 30,
        unlocked: false,
        completed: false,
    },
]

export default function SvgPathWorlds() {
    const [hoveredWorld, setHoveredWorld] = useState<number | null>(null)
    const navigate = useNavigate();

    const handleWorldClick = (world: World) => {
        if (!world.unlocked) {
            alert("Este mundo está bloqueado. Completa más niveles del mundo anterior.")
            return
        }
        // Navigate to level map
        navigate(`/modo-historia/mundo/${world.id}`);
    }

    const worldSpacing = 250 // Space between worlds
    const baseOffset = 300 // Bottom padding
    const topPadding = 200 // Top padding for last world
    const containerHeight = baseOffset + (worlds.length - 1) * worldSpacing + topPadding

    return (
        <div className="relative min-h-screen overflow-y-auto bg-gradient-to-b from-[#0a0a1f] via-[#1a0a2e] to-[#0f0520]">
            {/* Animated stars background */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-1 w-1 animate-pulse rounded-full bg-white"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                    />
                ))}
            </div>

            {/* World map path */}
            <div className="relative z-10 w-full px-6 py-12" style={{ height: `${containerHeight}px` }}>
                <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        d={`
              M 15% ${containerHeight - 150}
              Q 50% ${containerHeight - 300}, 75% ${containerHeight - 450}
              Q 50% ${containerHeight - 600}, 15% ${containerHeight - 750}
              Q 50% ${containerHeight - 900}, 75% ${containerHeight - 1050}
            `}
                        fill="none"
                        stroke="rgba(34, 211, 238, 0.6)"
                        strokeWidth="8"
                        filter="url(#glow)"
                    />
                </svg>

                {/* World nodes */}
                {worlds.map((world, index) => {
                    const isLeft = index % 2 === 0
                    const bottomPosition = baseOffset + index * worldSpacing
                    const leftPosition = isLeft ? "15%" : "75%"

                    return (
                        <div
                            key={world.id}
                            className="absolute"
                            style={{
                                bottom: `${bottomPosition}px`,
                                left: leftPosition,
                                transform: "translate(-50%, 50%)",
                            }}
                        >
                            <button
                                onClick={() => handleWorldClick(world)}
                                onMouseEnter={() => setHoveredWorld(world.id)}
                                onMouseLeave={() => setHoveredWorld(null)}
                                disabled={!world.unlocked}
                                className="group relative flex flex-col items-center transition-transform hover:scale-110 disabled:cursor-not-allowed"
                            >
                                {/* Planet/World sphere */}
                                <div
                                    className={`relative flex h-40 w-40 items-center justify-center rounded-full transition-all duration-300 ${!world.unlocked
                                        ? "bg-gray-700"
                                        : world.completed
                                            ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                            : hoveredWorld === world.id
                                                ? "bg-gradient-to-br from-pink-500 to-purple-600"
                                                : "bg-gradient-to-br from-cyan-400 to-blue-600"
                                        }`}
                                    style={{
                                        boxShadow: world.unlocked
                                            ? hoveredWorld === world.id
                                                ? "0 0 60px rgba(236, 72, 153, 0.8), 0 0 100px rgba(236, 72, 153, 0.4)"
                                                : "0 0 40px rgba(34, 211, 238, 0.6), 0 0 80px rgba(34, 211, 238, 0.3)"
                                            : "none",
                                    }}
                                >
                                    {/* Lock icon for locked worlds */}
                                    {!world.unlocked && <FontAwesomeIcon icon={faLock} className="h-16 w-16 text-gray-500" />}

                                    {/* World number */}
                                    {world.unlocked && (
                                        <span
                                            className="text-6xl font-bold text-white"
                                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                                        >
                                            {world.id}
                                        </span>
                                    )}

                                    {/* Completion crown */}
                                    {world.completed && <FontAwesomeIcon icon={faTrophy} className="absolute -top-6 h-12 w-12 text-yellow-300" />}
                                </div>

                                {/* World info card */}
                                <div
                                    className={`mt-4 rounded-lg border-2 px-6 py-3 transition-all ${!world.unlocked ? "border-gray-600 bg-gray-800/80" : "border-cyan-400 bg-[#0a0a1f]/90"
                                        }`}
                                    style={{
                                        boxShadow: world.unlocked ? "0 0 20px rgba(34, 211, 238, 0.3)" : "none",
                                    }}
                                >
                                    <h2 className={`text-center text-xl font-bold ${world.unlocked ? "text-cyan-400" : "text-gray-500"}`}>
                                        {world.name}
                                    </h2>
                                    <p className={`text-center text-sm ${world.unlocked ? "text-cyan-300" : "text-gray-600"}`}>
                                        {world.description}
                                    </p>

                                    {/* Progress indicators */}
                                    {world.unlocked && (
                                        <div className="mt-2 flex items-center justify-center gap-4 text-sm">
                                            {/* <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-white">
                                                    {world.stars}/{world.totalStars}
                                                </span>
                                            </div> */}
                                            <div className="text-white">
                                                {world.completedLevels}/{world.totalLevels} niveles
                                            </div>
                                        </div>
                                    )}

                                    {!world.unlocked && <p className="mt-2 text-center text-xs text-gray-500">Bloqueado</p>}
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
