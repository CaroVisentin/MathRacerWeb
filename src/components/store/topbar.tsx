import { BackButton } from "../../shared/buttons/backButton";
import { CoinsDisplay } from "../home/coinsDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../hooks/usePlayer";

export const Topbar = () => {
    const { player } = usePlayer();
    const coins = player?.coins ?? 0;
    const navigate = useNavigate();

    const handleClickCartButton = () => {
        // Navigate to level map
        navigate(`/cart`);
    }

    return (
        <div className="w-screen relative z-30 flex flex-col p-2">
            {/* Fila superior: Back, Título, Monedas */}
            <div className="h-16 flex items-center justify-between px-4">
                <BackButton />

                <div className="text-white text-5xl font-semibold text-center flex-1">
                    TIENDA
                </div>

                <div className="flex items-center gap-4">
                 

                    <CoinsDisplay coins={coins} />
                </div>

            </div>
        </div>
    );
};
