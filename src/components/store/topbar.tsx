import { BackButton } from "../../shared/buttons/backButton";
import { CoinsDisplay } from "../home/coinsDisplay";
import { homeDataMock } from "../../models/ui/home-data";

export const Topbar = () => {
    return (
        <div className="w-full relative z-30 flex flex-col p-2">
            {/* Fila superior: Back, Título, Monedas */}
            <div className="h-16 flex items-center justify-between px-4">
                <BackButton />

                <div className="text-white text-5xl font-semibold text-center flex-1">
                    TIENDA
                </div>

                <div className="flex flex-col items-end">
                    <CoinsDisplay coins={homeDataMock.user.coins} />
                </div>
            </div>
        </div>
    );
};
