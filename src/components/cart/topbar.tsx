import { BackButton } from "../../shared/buttons/backButton"
import { CoinsDisplay } from "../home/coinsDisplay"
import { usePlayer } from "../../hooks/usePlayer"

export const Topbar = () => {
    const { player } = usePlayer();
    const coins = player?.coins ?? 0;
    
    return (
        <div className="w-full relative z-30 flex flex-col p-2">
            {/* Fila superior: Back, Título, Monedas */}
            <div className="h-16 flex items-center justify-between px-4">
                <BackButton />

                <div className="text-white text-5xl font-semibold text-center flex-1">
                    CARRITO
                </div>

                <div className="flex items-center gap-4">
                    <CoinsDisplay coins={coins} />
                </div>

            </div>
        </div>
    )
}