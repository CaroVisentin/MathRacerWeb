import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faHelmetSafety, faImage } from '@fortawesome/free-solid-svg-icons'
import { CoinsDisplay } from '../home/coinsDisplay'
import { BackButton } from '../../shared/buttons/backButton'
import { homeDataMock } from '../../models/ui/home-data'

interface TopbarProps {
    activeCategory: "cars" | "characters" | "backgrounds";
    setActiveCategory: (category: "cars" | "characters" | "backgrounds") => void;
}

export const Topbar = ({ activeCategory, setActiveCategory }: TopbarProps) => {
    return (
        <div className="w-full h-16 flex items-center justify-between px-4 bg-black/70 relative z-30">
            {/* Left: Back button */}
            <BackButton />

            {/* Center icons */}
            <div className="flex gap-8">
                <button type="button" onClick={() => setActiveCategory("cars")}>
                    <FontAwesomeIcon
                        icon={faCar}
                        className={`text-xl transition ${activeCategory === "cars" ? "text-white scale-110" : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("characters")}>
                    <FontAwesomeIcon
                        icon={faHelmetSafety}
                        className={`text-xl transition ${activeCategory === "characters" ? "text-white scale-110" : "text-gray-400 hover:text-white"
                            }`}
                    />
                </button>

                <button type="button" onClick={() => setActiveCategory("backgrounds")}>
                    <FontAwesomeIcon
                        icon={faImage}
                        className={`text-xl transition ${activeCategory === "backgrounds" ? "text-white scale-110" : "text-gray-400 hover:text-white"
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

