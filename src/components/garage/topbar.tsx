import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faHelmetSafety, faImage } from '@fortawesome/free-solid-svg-icons'
import { CoinsDisplay } from '../home/coinsDisplay'
import { BackButton } from '../../shared/buttons/backButton'
import { homeDataMock } from '../../models/ui/home-data'

interface TopbarProps {
    activeCategory: "autos" | "personajes" | "fondos";
    setActiveCategory: (category: "autos" | "personajes" | "fondos") => void;
}

export const Topbar = ({ activeCategory, setActiveCategory }: TopbarProps) => {
    return (
        <div className="w-full h-16 flex items-center justify-between px-4 bg-black/70 relative z-30">
            {/* Left: Back button */}
            <BackButton />

            {/* Center icons */}
            <div className="flex gap-8">
                <button type="button" onClick={() => setActiveCategory("autos")}>
                    <FontAwesomeIcon
                        icon={faCar}
                        className={`text-xl transition ${activeCategory === "autos" ? "text-white scale-110" : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("personajes")}>
                    <FontAwesomeIcon
                        icon={faHelmetSafety}
                        className={`text-xl transition ${activeCategory === "personajes" ? "text-white scale-110" : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("fondos")}>
                    <FontAwesomeIcon
                        icon={faImage}
                        className={`text-xl transition ${activeCategory === "fondos" ? "text-white scale-110" : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>
            </div>

            {/* Right: Coins */}
            <div className="flex flex-col items-end">
                <CoinsDisplay coins={homeDataMock.user.coins} />
            </div>
        </div>
    );
};

