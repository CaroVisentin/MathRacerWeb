"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faStar } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import type { LevelMapProps } from "../../../models/ui/level"

// --- CONFIGURACIÓN DE COLORES ---
const COLORS = {
    neonPink: "#FF00A6",
    neonCyan: "#00FFFF",
    darkBackground: "#1A0033",
    trackBase: "#3f3d56",
    trackGlow: "#ff00cc",
    interior: "#fff",
    gold: "#FFD700",
}

// --- DIMENSIONES DEL SVG ---
const VIEW_BOX_WIDTH = 2400
const VIEW_BOX_HEIGHT = 1200

// --- PATH HORIZONTAL ---
const NEON_PATH_D = `
M -70 550
C 200 600, 400 700, 700 600
S 1100 400, 1400 600
S 1700 800, 2000 600
C 2150 550, 2250 500, 2450 550 
`;

const PATH_STROKE_WIDTH = 400
const GLOW_WIDTH = 500

export const SvgPathLevels: React.FC<LevelMapProps> = ({ levels, onLevelSelect, className = "" }) => {
    const ultimoNivelCompletado = 11;
    const internalPathRef = React.useRef<SVGPathElement>(null)
    const [pathLength, setPathLength] = React.useState(0)

    React.useEffect(() => {
        if (internalPathRef.current) {
            setPathLength(internalPathRef.current.getTotalLength())
        }
    }, [levels])

    const getNodePosition = (levelIndex: number) => {
        const position = (levelIndex + 1) / (levels.length + 1)

        if (pathLength === 0 || !internalPathRef.current) {
            return { x: VIEW_BOX_WIDTH * position, y: VIEW_BOX_HEIGHT / 2 }
        }

        const point = internalPathRef.current.getPointAtLength(position * pathLength)

        return { x: point.x, y: point.y }
    }

    return (
        <div
            className={`relative overflow-x-auto overflow-y-hidden text-white ${className}`}
            style={{
                backgroundColor: COLORS.darkBackground,
                height: `${VIEW_BOX_HEIGHT}px`,
            }}
        >
            <div className="relative h-full w-[2300px]">
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
                    preserveAspectRatio="none"
                >
                    <defs>
                        {/* Filtro para el borde interior */}
                        <filter id="neon-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        {/* Filtro para el glow principal */}
                        <filter id="neon-glow-pink" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="current-level-glow" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Glow BLANCO detrás */}
                    <path
                        d={NEON_PATH_D}
                        fill="none"
                        stroke={COLORS.trackGlow}
                        strokeWidth={GLOW_WIDTH}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#neon-glow-pink)"
                        opacity={0.7}
                    />

                    {/* Path principal GRIS */}
                    <path
                        d={NEON_PATH_D}
                        ref={internalPathRef}
                        fill="none"
                        stroke={COLORS.trackBase}
                        strokeWidth={PATH_STROKE_WIDTH}
                        strokeLinecap="round"
                    />

                    {/* Borde interior BLANCO */}
                    <path
                        d={NEON_PATH_D}
                        fill="none"
                        stroke={COLORS.interior}
                        strokeWidth="12"
                        strokeLinecap="round"
                        filter="url(#neon-glow-cyan)"
                    />
                </svg>

                {/* Niveles */}
                {levels.map((level, index) => {
                    const { x: vx, y: vy } = getNodePosition(index)
                    const xPercent = (vx / VIEW_BOX_WIDTH) * 100
                    const yPercent = (vy / VIEW_BOX_HEIGHT) * 100
                    const unlocked = level.number <= ultimoNivelCompletado + 1
                    const isCompleted = level.number <= ultimoNivelCompletado
                    const isCurrent = level.number === ultimoNivelCompletado + 1

                    return (
                        <div
                            key={level.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                        >
                            <button
                                onClick={() => unlocked && onLevelSelect?.(level)}
                                disabled={!unlocked}
                                className={`relative transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed ${isCurrent ? "animate-bounce" : ""
                                    }`}
                            >
                                {isCurrent && (
                                    <>
                                        <div
                                            className="absolute inset-0 rounded-full animate-ping"
                                            style={{
                                                transform: "scale(1.8)",
                                                backgroundColor: COLORS.neonCyan,
                                                opacity: 0.3,
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                transform: "scale(1.6)",
                                                filter: "url(#current-level-glow)",
                                                backgroundColor: COLORS.neonCyan,
                                                opacity: 0.5,
                                            }}
                                        />
                                    </>
                                )}

                                {/* 'Glow' del botón */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        transform: "scale(1.4)",
                                        filter: "url(#neon-glow-pink)",
                                        backgroundColor: unlocked ? COLORS.neonPink : "rgba(31, 41, 55, 0.25)",
                                    }}
                                />

                                {/* Contenedor para el efecto 3D */}
                                <div className="relative w-20 h-20">
                                    {/* Base lateral (simula el lateral del cilindro) */}
                                    <div
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            boxShadow: `0 8px 0 0 ${COLORS.neonPink} inset, 0 8px 0 0 ${unlocked ? COLORS.neonPink : "rgba(31, 41, 55, 0.5)"}`,
                                            backgroundColor: "transparent",
                                            opacity: unlocked ? 1 : 0.5,
                                            transform: "translateY(4px)",
                                        }}
                                    />

                                    {/* Botón Principal (Tapa superior) */}
                                    <div
                                        className="relative flex h-20 w-20 items-center justify-center rounded-full transition-all border-4"
                                        style={{
                                            borderColor: COLORS.neonPink,
                                            boxShadow: `0 0 5px ${COLORS.neonPink}, inset 0 0 5px ${COLORS.neonPink}`,
                                            backgroundColor: "black",
                                            transform: "translateY(0)",
                                        }}
                                    >
                                        <div className="relative z-10 flex items-center justify-center">
                                            {unlocked ? (
                                                <span
                                                    className="text-3xl font-extrabold"
                                                    style={{
                                                        color: COLORS.neonCyan,
                                                        textShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
                                                    }}
                                                >
                                                    {level.number}
                                                </span>
                                            ) : (
                                                <FontAwesomeIcon icon={faLock} className="h-8 w-8 text-gray-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {isCompleted && (
                                <>
                                    {/* Estrella izquierda */}
                                    <div className="absolute bottom-0 left-1 -translate-x-1 translate-y-1">
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="h-4 w-4"
                                            style={{
                                                color: COLORS.gold,
                                                filter: "drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))",
                                            }}
                                        />
                                    </div>
                                    {/* Estrella centro */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5">
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="h-4 w-4"
                                            style={{
                                                color: COLORS.gold,
                                                filter: "drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))",
                                            }}
                                        />
                                    </div>
                                    {/* Estrella derecha */}
                                    <div className="absolute bottom-0 right-1 translate-x-1 translate-y-1">
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="h-4 w-4"
                                            style={{
                                                color: COLORS.gold,
                                                filter: "drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))",
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
