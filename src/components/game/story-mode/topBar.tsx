import { BackButton } from "../../../shared/buttons/backButton"
import { batteryIcons } from "../../../models/ui/home-data";

interface TopBarProps {
    headerText: string;
    remainingLives: number;
}

export const TopBar = ({ headerText, remainingLives }: TopBarProps) => {
    const time = "15:37";

    return (
        <div className="relative z-20 flex shrink-0 items-center justify-between px-6 py-6">
            {/* Botón de volver */}
            <BackButton />

            {/* Título del mundo centrado */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-8 py-3 backdrop-blur-sm">
                    <h1 className="text-2xl tracking-wider text-cyan-300">{headerText}</h1>
                </div>
            </div>

            {/* Vidas + temporizador */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center h-full">
                    <img src={batteryIcons.pilabolt} alt="bolt" className="h-4" />
                    <span className="text-base font-semibold text-white">{time}</span>
                </div>

                <div className="flex items-center gap-1">
                    {[...Array(10)].map((_, i) => (
                        <img
                            key={i}
                            src={i < remainingLives ? batteryIcons.pila : batteryIcons.pilaempty}
                            className="w-4 h-8"
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}
