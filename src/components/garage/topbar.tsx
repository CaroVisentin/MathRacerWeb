import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faHelmetSafety, faImage } from '@fortawesome/free-solid-svg-icons'
import { CoinsDisplay } from '../home/coinsDisplay'
import { BackButton } from '../../shared/buttons/backButton'
import { homeDataMock } from '../../models/ui/home-data'

export const Topbar = () => {
    return (
        <div className="w-full h-16 flex items-center justify-between px-4 bg-black/70 relative z-30">
            {/* Left: Back button */}
            <BackButton />

            {/* Center icons */}
            <div className="flex gap-8">
                <button type="button">
                    <FontAwesomeIcon icon={faCar} className="text-white text-xl" />
                </button>
                <button type="button">
                    <FontAwesomeIcon icon={faHelmetSafety} className="text-gray-300 text-xl" />
                </button>
                <button type="button">
                    <FontAwesomeIcon icon={faImage} className="text-gray-300 text-xl" />
                </button>
            </div>

            {/* Right: Coins */}
            <div className="flex flex-col items-end">
                <CoinsDisplay coins={homeDataMock.user.coins} />
            </div>
        </div>
    )
}
