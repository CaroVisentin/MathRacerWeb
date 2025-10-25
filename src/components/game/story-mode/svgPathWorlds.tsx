import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { worlds, type World } from "../../../models/ui/world";

export const SvgPathWorlds = () => {

    const navigate = useNavigate();
    const [hoveredWorld, setHoveredWorld] = useState<number | null>(null)

    const worldSpacing = 400
    const baseOffset = 200
    const containerWidth = baseOffset * 2 + worldSpacing * (worlds.length - 1)

    const handleWorldClick = (world: World) => {
        if (world.unlocked) {
            navigate(`/modo-historia/mundo/${world.id}`)
        }
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[#1C092D] crt-scanlines">

            {/* Pixel stars background */}
            <div className="absolute inset-0">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white pixel-grid"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() > 0.5 ? 1 : 0.5,
                            animation: Math.random() > 0.7 ? "blink-pixel 2s infinite" : "none",
                        }}
                    />
                ))}
            </div>

            {/* Racing track path */}
            <div className="relative h-full px-6 py-24 overflow-x-auto" style={{ scrollBehavior: "smooth" }}>
                <div className="relative h-full" style={{ width: `${containerWidth}px` }}>
                    {/* Asphalt track */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                        <defs>
                            <pattern id="asphalt" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                                <rect width="8" height="8" fill="#333344" />
                                <rect x="0" y="0" width="2" height="2" fill="#ffff" />
                                <rect x="4" y="4" width="2" height="2" fill="#ffff" />
                            </pattern>
                        </defs>

                        {/* Road path */}
                        <path
                            d={`
                M ${baseOffset} 30%
                L ${baseOffset + worldSpacing} 70%
                L ${baseOffset + worldSpacing * 2} 30%
                L ${baseOffset + worldSpacing * 3} 70%
              `}
                            fill="none"
                            stroke="url(#asphalt)"
                            strokeWidth="120"
                            strokeLinecap="square"
                        />

                        {/* Yellow road lines */}
                        <path
                            d={`
                M ${baseOffset} 30%
                L ${baseOffset + worldSpacing} 70%
                L ${baseOffset + worldSpacing * 2} 30%
                L ${baseOffset + worldSpacing * 3} 70%
              `}
                            fill="none"
                            stroke="#ffff00"
                            strokeWidth="4"
                            strokeDasharray="20,20"
                            strokeLinecap="square"
                        />
                    </svg>

                    {/* World nodes */}
                    {worlds.map((world, index) => {
                        const isTop = index % 2 === 0
                        const leftPosition = baseOffset + index * worldSpacing
                        const topPosition = isTop ? "30%" : "70%"

                        return (
                            <div
                                key={world.id}
                                className="absolute z-10"
                                style={{
                                    left: `${leftPosition}px`,
                                    top: topPosition,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <button
                                    onClick={() => handleWorldClick(world)}
                                    onMouseEnter={() => setHoveredWorld(world.id)}
                                    onMouseLeave={() => setHoveredWorld(null)}
                                    disabled={!world.unlocked}
                                    className="group relative flex flex-col items-center disabled:cursor-not-allowed"
                                >
                                    {/* Pixel art car/world icon */}
                                    <div className="relative mb-6">

                                        {/* Car body - pixel art style */}
                                        <div
                                            className={`relative w-32 h-32 transition-transform ${hoveredWorld === world.id ? "scale-110 animate-bounce-pixel" : ""
                                                }`}
                                        >
                                            {world.unlocked ? (
                                                <>
                                                    {/* Car sprite */}
                                                    <div
                                                        className="absolute inset-0 pixel-grid"
                                                        style={{
                                                            clipPath: "polygon(20% 30%, 80% 30%, 90% 50%, 90% 80%, 10% 80%, 10% 50%)",
                                                        }}
                                                    />
                                                    {/* Car windows */}
                                                    <div
                                                        className="absolute top-8 left-8 right-8 h-8 bg-[#1a1a3e] pixel-grid"
                                                        style={{
                                                            clipPath: "polygon(15% 0%, 85% 0%, 75% 100%, 25% 100%)",
                                                        }}
                                                    />
                                                    {/* Car number */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span
                                                            className="text-5xl font-bold retro-text-shadow"
                                                            style={{ color: "#ffffff" }}
                                                        >
                                                            {world.id}
                                                        </span>
                                                    </div>
                                                    {/* Wheels */}
                                                    <div className="absolute bottom-2 left-4 w-6 h-6 bg-[#1a1a3e] border-2 border-white" />
                                                    <div className="absolute bottom-2 right-4 w-6 h-6 bg-[#1a1a3e] border-2 border-white" />

                                                    {/* Trophy for completed */}
                                                    {world.completed && (
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#ffff00] border-4 border-[#ff9900] flex items-center justify-center animate-bounce-pixel">
                                                            <span className="text-2xl">🏆</span>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                // Locked state
                                                <div className="absolute inset-0 bg-[#444466] pixel-grid flex items-center justify-center">
                                                    <div className="w-16 h-20 border-4 border-[#666688]">
                                                        <div className="w-full h-8 border-b-4 border-[#666688]" />
                                                        <div className="w-full h-12 flex items-center justify-center">
                                                            <div className="w-4 h-6 bg-[#666688]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Checkered flag for active world */}
                                        {world.unlocked && hoveredWorld === world.id && (
                                            <div className="absolute -right-8 top-0 w-12 h-16 animate-bounce-pixel">
                                                <div className="w-full h-full grid grid-cols-3 grid-rows-4 border-2 border-white">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`${(Math.floor(i / 3) + (i % 3)) % 2 === 0 ? "bg-white" : "bg-[#1a1a3e]"}`}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="w-1 h-20 bg-[#666688] absolute left-0 -bottom-20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info card - Retro arcade style */}
                                    <div
                                        className={`relative border-4 px-6 py-4 min-w-[240px] ${world.unlocked ? `bg-[#1a1a3e]` : "border-[#666688] bg-[#2a2a3e]"
                                            }`}
                                    >
                                        {/* Corner decorations */}
                                        <div
                                            className={`absolute -top-2 -left-2 w-4 h-4 ${world.unlocked ? `bg-[#F95EC8]` : "bg-[#666688]"}`}
                                        />
                                        <div
                                            className={`absolute -top-2 -right-2 w-4 h-4 ${world.unlocked ? `bg-[#F95EC8]` : "bg-[#666688]"}`}
                                        />
                                        <div
                                            className={`absolute -bottom-2 -left-2 w-4 h-4 ${world.unlocked ? `bg-[#F95EC8]` : "bg-[#666688]"}`}
                                        />
                                        <div
                                            className={`absolute -bottom-2 -right-2 w-4 h-4 ${world.unlocked ? `bg-[#F95EC8]` : "bg-[#666688]"}`}
                                        />

                                        <h2
                                            className={`text-center text-2xl mb-2 retro-text-shadow ${world.unlocked ? `text-[#F95EC8]` : "text-[#666688]"
                                                }`}
                                        >
                                            {world.name}
                                        </h2>
                                        <p className={`text-center text-lg mb-3 ${world.unlocked ? "text-white" : "text-[#666688]"}`}>
                                            {world.description}
                                        </p>

                                        {world.unlocked && (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex gap-1">
                                                    {[...Array(world.totalLevels)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-4 h-6 border-2 ${i < world.completedLevels
                                                                ? `bg-[#FFE50C] border-white`
                                                                : "bg-[#2a2a3e] border-[#666688]"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {!world.unlocked && (
                                            <p className="text-center text-xs text-[#666688] mt-2 animate-blink-pixel">BLOQUEADO</p>
                                        )}
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
};
