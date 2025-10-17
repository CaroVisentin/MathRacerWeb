// MAPA DE NIVELES DE CADA MUNDO

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import type { LevelMapProps } from "../../../models/ui/level";

// --- CONFIGURACIÓN DE COLORES NEÓN ---
const COLORS = {
    neonPink: '#FF00A6',
    neonCyan: '#00FFFF',
    darkBackground: '#1A0033',
};

const VIEW_BOX_WIDTH = 900;
const VIEW_BOX_HEIGHT = 2250;

// --- PATH ---
const NEON_PATH_D = `
  M 100 ${VIEW_BOX_HEIGHT}
  C 200 ${VIEW_BOX_HEIGHT - 200}, 700 ${VIEW_BOX_HEIGHT - 400}, 500 ${VIEW_BOX_HEIGHT - 700}
  S 150 ${VIEW_BOX_HEIGHT - 1100}, 500 ${VIEW_BOX_HEIGHT - 1400}
  S 800 ${VIEW_BOX_HEIGHT - 1700}, 500 ${VIEW_BOX_HEIGHT - 2000}
  C 300 ${VIEW_BOX_HEIGHT - 2150}, 400 ${VIEW_BOX_HEIGHT - 2250}, 450 ${VIEW_BOX_HEIGHT - 2300}
`;

export const SvgPathLevels: React.FC<LevelMapProps> = ({ levels, onLevelSelect, className = '' }) => {
    const ultimoNivelCompletado = 4;
    const internalPathRef = React.useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = React.useState(0);

    React.useEffect(() => {
        if (internalPathRef.current) {
            setPathLength(internalPathRef.current.getTotalLength());
        }
    }, [levels]);

    const getNodePosition = (levelIndex: number) => {
        const position = (levelIndex + 1) / (levels.length + 1);

        if (pathLength === 0 || !internalPathRef.current) {
            return { x: VIEW_BOX_WIDTH / 2, y: VIEW_BOX_HEIGHT * position };
        }

        const point = internalPathRef.current.getPointAtLength(position * pathLength);
        return { x: point.x, y: point.y };
    };

    return (
        <div
            className={`relative z-10 overflow-y-scroll overflow-x-hidden text-white ${className}`}
            style={{
                backgroundColor: COLORS.darkBackground
            }}
        >
            <div
                className="relative mx-auto h-full w-full"
                style={{ height: `${VIEW_BOX_HEIGHT}px`, overflowY: 'visible' }}
            >
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
                    preserveAspectRatio="none"
                >
                    <defs>
                        <filter id="neon-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="neon-glow-pink" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <pattern id="checkerboard" width="80" height="80" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="40" height="40" fill="#00cccc" opacity="0.5" />
                            <rect x="40" y="40" width="40" height="40" fill="#00cccc" opacity="0.5" />
                            <rect x="40" y="0" width="40" height="40" fill="#009999" opacity="0.3" />
                            <rect x="0" y="40" width="40" height="40" fill="#009999" opacity="0.3" />
                        </pattern>
                    </defs>


                    {/* Glow fondo rosa */}
                    <path
                        d={NEON_PATH_D}
                        fill="none"
                        stroke={COLORS.neonPink}
                        strokeWidth="120"
                        strokeLinecap="round"
                        filter="url(#neon-glow-pink)"
                        opacity={0.9}
                    />

                    {/* Contorno sólido rosa */}
                    <path
                        d={NEON_PATH_D}
                        ref={internalPathRef}
                        fill="none"
                        stroke={COLORS.neonCyan}
                        strokeWidth="90"
                        strokeLinecap="round"
                    />

                    {/* Checkerboard */}
                    <path
                        d={NEON_PATH_D}
                        fill="none"
                        stroke="url(#checkerboard)"
                        strokeWidth="70"
                        strokeLinecap="round"
                    />

                    {/* Borde interior cyan */}
                    <path
                        d={NEON_PATH_D}
                        fill="none"
                        stroke={COLORS.neonCyan}
                        strokeWidth="8"
                        strokeLinecap="round"
                        filter="url(#neon-glow-cyan)"
                    />
                </svg>

                {/* Niveles */}
                {levels.map((level, index) => {
                    const { x: vx, y: vy } = getNodePosition(index);
                    const xPercent = (vx / VIEW_BOX_WIDTH) * 100;
                    const yPercent = (vy / VIEW_BOX_HEIGHT) * 100;
                    const unlocked = level.number <= ultimoNivelCompletado + 1;

                    return (
                        <button
                            key={level.id}
                            onClick={() => unlocked && onLevelSelect?.(level)}
                            disabled={!unlocked}
                            className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed"
                            style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                        >
                            {/* Glow de fondo */}
                            <div
                                className={`absolute inset-0 rounded-full blur-lg"
                                    }`}
                                style={{
                                    transform: "scale(1.4)",
                                    filter: `url(#neon-glow-pink)`,
                                    backgroundColor: unlocked ? COLORS.neonPink : 'rgba(31, 41, 55, 0.25)',
                                }}
                            />

                            {/* Botón principal con borde rosa */}
                            <div
                                className="relative flex h-20 w-20 items-center justify-center rounded-full transition-all border-4"
                                style={{
                                    borderColor: COLORS.neonPink,
                                    boxShadow: `0 0 10px ${COLORS.neonPink}, inset 0 0 10px ${COLORS.neonPink}`,
                                    backgroundColor: unlocked ? COLORS.neonCyan : 'bg-gray-800',
                                }}
                            >
                                <div className="relative z-10 flex items-center justify-center">
                                    {unlocked ? (
                                        <span
                                            className="text-3xl font-extrabold text-white"
                                            style={{
                                                textShadow: `
                                                0 0 2px #000,       
                                                0 0 10px rgba(255,255,255,0.7)
    `
                                            }}                                        >
                                            {level.number}
                                        </span>
                                    ) : (
                                        <FontAwesomeIcon icon={faLock} className="h-8 w-8 text-gray-500" />
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
