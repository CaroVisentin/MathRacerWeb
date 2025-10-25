import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackButton } from "../../shared/buttons/backButton";
import { faCar, faHelmetSafety, faImage, faCoins, faBolt } from "@fortawesome/free-solid-svg-icons";
import { CoinsDisplay } from "../home/coinsDisplay";
import { homeDataMock } from "../../models/ui/home-data";

interface TopbarProps {
    activeCategory: "cars" | "characters" | "backgrounds" | "coins" | "energy";
    setActiveCategory: (category: "cars" | "characters" | "backgrounds" | "coins" | "energy") => void;
}

export const Topbar = ({ activeCategory, setActiveCategory }: TopbarProps) => {
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

            {/* Fila inferior: íconos */}
            <div className="flex justify-center gap-8 py-2">
                <button type="button" onClick={() => setActiveCategory("cars")}>
                    <FontAwesomeIcon
                        icon={faCar}
                        className={`text-xl transition ${activeCategory === "cars"
                            ? "text-white scale-110"
                            : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("characters")}>
                    <FontAwesomeIcon
                        icon={faHelmetSafety}
                        className={`text-xl transition ${activeCategory === "characters"
                            ? "text-white scale-110"
                            : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("backgrounds")}>
                    <FontAwesomeIcon
                        icon={faImage}
                        className={`text-xl transition ${activeCategory === "backgrounds"
                            ? "text-white scale-110"
                            : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("coins")}>
                    <FontAwesomeIcon
                        icon={faCoins}
                        className={`text-xl transition ${activeCategory === "coins"
                            ? "text-white scale-110"
                            : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("energy")}>
                    <FontAwesomeIcon
                        icon={faBolt}
                        className={`text-xl transition ${activeCategory === "energy"
                            ? "text-white scale-110"
                            : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};
