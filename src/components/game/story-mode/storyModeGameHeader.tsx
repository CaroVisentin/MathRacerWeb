import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { StartSoloGameResponseDto } from "../../../models/domain/story-mode/startSoloGameResponseDto";
import { FuelIndicator } from "../../../shared/energy/energy";

interface GameHeaderProps {
    startMatch: boolean;
    gameData: StartSoloGameResponseDto | null;
    timeLeft: number;
    remainingLives: number;
    onBack: () => void;
}

export const StoryModeGameHeader = ({ startMatch, gameData, timeLeft, remainingLives, onBack, }: GameHeaderProps) => {
    return (
        <div className="flex justify-between items-center bg-neutral-900 px-4 py-3 z-10">
            {/* Botón de volver */}
            <button className="px-3 py-1 rounded" onClick={onBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {/* Tiempo por ecuación */}
            {startMatch && gameData && (
                <div
                    className={`text-white px-3 py-1 text-5xl font-bold ${timeLeft <= 3 ? "text-red-500" : ""
                        }`}
                >
                    {timeLeft}s
                </div>
            )}

            {/* Vidas */}
            <FuelIndicator remainingLives={remainingLives} />
        </div>
    );
};
