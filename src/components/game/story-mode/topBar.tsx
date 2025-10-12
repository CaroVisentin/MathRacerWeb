import { BackButton } from "../../../shared/buttons/backButton"

interface TopBarProps {
    world: string;
    remainingLives: number;
}

export const TopBar = ({ world, remainingLives }: TopBarProps) => {

    return (
        <div className="relative z-20 flex shrink-0 items-center justify-between px-6 py-4">
            {/* Botón de volver */}
            <BackButton />

            {/* Título del mundo */}
            <div className="relative z-20 w-fit">
                <div className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-8 py-3 backdrop-blur-sm">
                    <h1 className="text-2xl font-audiowide tracking-wider text-cyan-300">{world}</h1>
                </div>
            </div>

            {/* Vidas + temporizador */}
            <div className="flex items-center gap-3">
                {/* Barras de vidas */}
                <div className="flex items-center gap-1">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-6 w-3 rounded-sm ${i < remainingLives
                                    ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                                    : "bg-gray-700/50"
                                }`}
                        />
                    ))}
                </div>

                {/* Temporizador visible solo si faltan vidas */}
                {/* {vidas < 10 && tiempoRestante !== null && (
                    <div className="text-sm text-yellow-300 font-mono bg-yellow-900/30 border border-yellow-500/50 px-3 py-1 rounded-md animate-pulse">
                        +1 ❤️ in {minutos}:{segundos.toString().padStart(2, "0")}
                    </div>
                )} */}
            </div>
        </div>
    )
}
