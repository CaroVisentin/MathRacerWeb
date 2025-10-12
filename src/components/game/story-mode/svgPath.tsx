import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import type { LevelMapProps } from "../../../models/ui/level";

export const SvgPath: React.FC<LevelMapProps> = ({
    levels,
    nodePositions,
    onLevelSelect,
    pathRef,
}) => {
    // Por ahora hardcodeado (después puede venir del context del usuario)
    const ultimoNivelCompletado = 4;

    return (
        <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 pt-12 text-white">
            <div className="relative mx-auto" style={{ height: "2000px" }}>
                {/* SVG Path */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
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

                    <path
                        ref={pathRef}
                        id="mainPath"
                        d="M 10 98 C 10 96, 15 94, 25 92 C 40 89, 60 87, 80 85 C 92 84, 96 82, 95 79 C 94 76, 88 74, 75 72 C 55 69, 35 67, 20 65 C 10 64, 6 62, 5 59 C 4 56, 8 54, 20 52 C 40 49, 60 47, 80 45 C 92 44, 96 42, 95 39 C 94 36, 88 34, 75 32 C 55 29, 35 27, 20 25 C 10 24, 6 22, 5 19 C 4 16, 8 14, 20 12 C 40 9, 60 7, 80 5 C 92 4, 96 2, 90 1 C 80 0, 60 0, 50 0"
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="1"
                        filter="url(#glow)"
                        opacity="0.9"
                    />

                    <path
                        d="M 10 98 C 10 96, 15 94, 25 92 C 40 89, 60 87, 80 85 C 92 84, 96 82, 95 79 C 94 76, 88 74, 75 72 C 55 69, 35 67, 20 65 C 10 64, 6 62, 5 59 C 4 56, 8 54, 20 52 C 40 49, 60 47, 80 45 C 92 44, 96 42, 95 39 C 94 36, 88 34, 75 32 C 55 29, 35 27, 20 25 C 10 24, 6 22, 5 19 C 4 16, 8 14, 20 12 C 40 9, 60 7, 80 5 C 92 4, 96 2, 90 1 C 80 0, 60 0, 50 0"
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="2"
                        opacity="0.3"
                        filter="url(#glow)"
                    />
                </svg>

                {/* Niveles */}
                {levels.map((level, index) => {
                    const pos = nodePositions[index] || { x: 0, y: 0 };
                    const unlocked = level.number <= ultimoNivelCompletado + 1; // el siguiente al último completado también está desbloqueado
                    const isCyan = level.number % 2 === 1; // alterna colores entre niveles

                    return (
                        <button
                            key={level.id}
                            onClick={() => unlocked && onLevelSelect?.(level)}
                            disabled={!unlocked}
                            className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                            }}
                        >
                            {/* Outer glow */}
                            <div
                                className={`absolute inset-0 rounded-full blur-md ${unlocked
                                        ? isCyan
                                            ? "bg-cyan-400/50"
                                            : "bg-fuchsia-400/50"
                                        : "bg-gray-600/30"
                                    }`}
                                style={{ transform: "scale(1.2)" }}
                            />

                            {/* Main button */}
                            <div
                                className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all ${unlocked
                                        ? isCyan
                                            ? "bg-gradient-to-b from-cyan-400 to-cyan-600"
                                            : "bg-gradient-to-b from-fuchsia-400 to-fuchsia-600"
                                        : "bg-gradient-to-b from-gray-600 to-gray-800"
                                    }`}
                                style={{
                                    boxShadow: unlocked
                                        ? isCyan
                                            ? "0 6px 0 #0891b2, 0 8px 15px rgba(6, 182, 212, 0.4)"
                                            : "0 6px 0 #a21caf, 0 8px 15px rgba(217, 70, 239, 0.4)"
                                        : "0 4px 0 #374151, 0 6px 10px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <div className="relative z-10 flex items-center justify-center">
                                    {unlocked ? (
                                        <span
                                            className={`text-3xl font-bold ${isCyan ? "text-cyan-950" : "text-fuchsia-950"
                                                }`}
                                            style={{
                                                textShadow: "0 1px 2px rgba(255, 255, 255, 0.3)",
                                            }}
                                        >
                                            {level.number}
                                        </span>
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="h-8 w-8 text-gray-400"
                                        />
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
