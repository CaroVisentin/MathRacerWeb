import { BackButton } from "../../shared/buttons/backButton";
import { usePlayer } from "../../hooks/usePlayer";

export const Topbar = () => {

    return (
        <div className="w-full max-w-full overflow-x-hidden relative z-30 flex flex-col p-2">
            {/* Fila superior: Back, Título, Monedas */}
            <div className="h-16 flex items-center justify-between px-4">
                <BackButton />

                <div className="text-white text-5xl font-semibold text-center flex-1">
                    TIENDA
                </div>

          

            </div>
        </div>
    );
};
