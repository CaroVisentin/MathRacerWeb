import { BackButton } from "../../shared/buttons/backButton";
import { CoinsDisplay } from "../home/coinsDisplay";
import { homeDataMock } from "../../models/ui/home-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const navigate = useNavigate();

    const handleClickCartButton = () => {
        // Navigate to level map
        navigate(`/cart`);
    }

    return (
        <div className="w-full relative z-30 flex flex-col p-2">
            {/* Fila superior: Back, Título, Monedas */}
            <div className="h-16 flex items-center justify-between px-4">
                <BackButton />

                <div className="text-white text-5xl font-semibold text-center flex-1">
                    TIENDA
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="relative flex items-center justify-center w-12 h-12 border border-[#00FCFC]"
                        onClick={() => handleClickCartButton()}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className="text-white h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-lg text-white bg-[#FF51C2]">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <CoinsDisplay coins={homeDataMock.user.coins} />
                </div>

            </div>
        </div>
    );
};
