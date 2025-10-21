"use client"
import React, { useState } from "react"
import type { LevelMapProps } from "../../../models/ui/level"


export const SvgPathLevels: React.FC<LevelMapProps> = ({ levels }) => {
    const [hoveredLevel, setHoveredLevel] = useState<number | null>(null)

    return (
        <div className="relative min-h-screen bg-[#1a0a2e] overflow-auto py-8">
            {/* Scanline effect */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-10">
                <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_2px,#000_4px)]" />
            </div>

            {/* Animated background stars */}
            {[...Array(40)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white pixel-corners animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                />
            ))}

            {/* Main content - Horizontal grid */}
            <div className="relative z-30 flex items-center justify-center min-h-[calc(100vh-200px)] px-8">
                <div className="w-full max-w-6xl">
                    {/* Decorative top border */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50" />
                            <div className="relative flex gap-2 py-4">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-yellow-400 pixel-corners" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Level grid - 3 rows x 3 columns */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        {levels.map((level) => (
                            <div key={level.id} className="flex justify-center">
                                <button
                                    className={`relative group ${!level.unlocked && "cursor-not-allowed"}`}
                                    onMouseEnter={() => setHoveredLevel(level.id)}
                                    onMouseLeave={() => setHoveredLevel(null)}
                                    disabled={!level.unlocked}
                                >
                                    {/* Outer frame */}
                                    <div
                                        className={`relative border-8 pixel-corners p-4 transition-all ${!level.unlocked
                                            ? "border-gray-600 bg-gray-800"
                                            : level.completed
                                                ? "border-yellow-400 bg-[#1a0a2e]"
                                                : "border-cyan-400 bg-[#1a0a2e]"
                                            } ${hoveredLevel === level.id && level.unlocked ? "scale-110" : "scale-100"}`}
                                    >
                                        {/* Outer container padding extra para la bandera */}
                                        <div className="relative w-32 h-32 flex flex-col items-center justify-center gap-2 pt-4">

                                            {/* Checkered flag for completed levels */}
                                            {level.completed && (
                                                <div className="absolute top-0 right-0 w-8 h-8 grid grid-cols-4 grid-rows-4 gap-0 m-1">
                                                    {[...Array(16)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`${(i + Math.floor(i / 4)) % 2 === 0 ? "bg-white" : "bg-black"}`}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Level number */}
                                            <div
                                                className={`text-6xl font-bold retro-text ${level.completed ? "text-yellow-400" : "text-cyan-400"}`}
                                            >
                                                {level.id}
                                            </div>

                                            {/* Stars */}
                                            {level.completed && (
                                                <div className="flex gap-1">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-5 h-5 pixel-corners ${i < level.stars ? "bg-yellow-400" : "bg-gray-600"}`}
                                                            style={{
                                                                clipPath:
                                                                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Corner decorations */}
                                        <div className="absolute top-0 left-0 w-2 h-2 bg-white pixel-corners" />
                                        <div className="absolute top-0 right-0 w-2 h-2 bg-white pixel-corners" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white pixel-corners" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white pixel-corners" />
                                    </div>


                                    {/* Hover label */}
                                    {hoveredLevel === level.id && level.unlocked && (
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce-slow">
                                            <div className="bg-[#1a0a2e] border-4 border-cyan-400 px-4 py-2 pixel-corners">
                                                <p className="text-cyan-400 font-bold text-sm retro-text">NIVEL {level.id}</p>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Decorative bottom border */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50" />
                            <div className="relative flex gap-2 py-4">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-yellow-400 pixel-corners" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
